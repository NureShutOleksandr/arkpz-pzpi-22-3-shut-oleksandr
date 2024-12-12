import { AuthService } from './auth.service'
import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res, UsePipes } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ValidationPipe } from '../../pipes/validation.pipe'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { Response, Request } from 'express'
import { LoginResponseDto } from './dto/login-response.dto'
import { RegisterResponseDto } from './dto/register-response.dto'
import { RefreshResponseDto } from './dto/refresh-response.dto'
import { UpdatePasswordResponseDto } from './dto/update-password-response.dto'
import { UpdatePasswordReqDto } from './dto/update-password-req.dto'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'user login' })
  @ApiResponse({ status: 200, type: LoginResponseDto })
  @UsePipes(ValidationPipe)
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: CreateUserDto, @Res() res: Response): Promise<void> {
    const { accessToken } = await this.authService.login(dto)

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    })
    res.send({ message: 'Login successful', token: { accessToken } })
  }

  @ApiOperation({ summary: 'user register' })
  @ApiResponse({ status: 200, type: RegisterResponseDto })
  @UsePipes(ValidationPipe)
  @Post('/registration')
  @HttpCode(HttpStatus.CREATED)
  async registration(@Body() userDto: CreateUserDto, @Res() res: Response): Promise<void> {
    const { accessToken } = await this.authService.registration(userDto)

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    })

    res.send({ message: 'Registration successful', token: { accessToken } })
  }

  @ApiOperation({ summary: 'change user password to another one' })
  @ApiResponse({ status: 200, type: UpdatePasswordResponseDto })
  @UsePipes(ValidationPipe)
  @Post('/update-password')
  @HttpCode(HttpStatus.OK)
  async updatePassword(@Body() dto: UpdatePasswordReqDto): Promise<UpdatePasswordResponseDto> {
    return this.authService.updatePassword(dto)
  }

  @ApiOperation({ summary: 'refresh access token' })
  @ApiResponse({ status: 200, type: RefreshResponseDto })
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Req() req: Request, @Res() res: Response): Promise<void> {
    const accessTokenFromReq = req.cookies['accessToken']

    const { accessToken } = await this.authService.refreshToken(accessTokenFromReq)

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    })
    res.send({ message: 'Token updated', token: { accessToken } })
  }
}
