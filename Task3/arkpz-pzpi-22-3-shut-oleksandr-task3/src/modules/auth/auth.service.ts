import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { User, UserDocument } from '../users/users.schema'
import * as bcrypt from 'bcryptjs'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { TokenResponseDto } from './dto/token-response.dto'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(dto: CreateUserDto): Promise<TokenResponseDto> {
    const user = await this.validateUser(dto)
    return this.generateToken(user)
  }

  async registration(dto: CreateUserDto): Promise<TokenResponseDto> {
    const candidate = await this.userModel.findOne({ username: dto.username })

    if (candidate) throw new HttpException('User exist already', HttpStatus.BAD_REQUEST)

    const hashPassword = await bcrypt.hash(dto.password, +process.env.PASSWORD_SALT)

    const user = await this.usersService.create({ ...dto, password: hashPassword })

    return this.generateToken(user)
  }

  async refreshToken(accessToken: string): Promise<TokenResponseDto> {
    try {
      const payload = this.jwtService.verify(accessToken, { secret: process.env.JWT_ACCESS_SECRET })

      const user = await this.usersService.getUserById(payload.id)

      if (!user) throw new UnauthorizedException()

      return this.generateToken(user)
    } catch (e) {
      throw new UnauthorizedException('Invalid refresh token')
    }
  }

  private async generateToken(user: UserDocument): Promise<TokenResponseDto> {
    const payload = { username: user.username, id: user._id, roles: user.roles }

    const accessToken = this.jwtService.sign(payload, { expiresIn: '30d', secret: process.env.JWT_ACCESS_SECRET })

    return { accessToken }
  }

  private async validateUser(dto: CreateUserDto): Promise<UserDocument> {
    const user = await this.usersService.getUserByUsername(dto.username)

    if (!user) throw new HttpException('User has been not found', HttpStatus.NOT_FOUND)

    const passwordEquals = await bcrypt.compare(dto.password, user.password)

    if (user && passwordEquals) return user

    throw new UnauthorizedException({ message: 'Incorrect password' })
  }
}
