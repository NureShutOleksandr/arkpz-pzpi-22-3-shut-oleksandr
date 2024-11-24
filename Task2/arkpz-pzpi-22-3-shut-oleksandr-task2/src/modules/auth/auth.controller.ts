import { AuthService } from './auth.service'
import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res, UsePipes } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ValidationPipe } from '../../pipes/validation.pipe'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { Response, Request } from 'express'
import { LoginResponseDto } from './dto/login-response.dto'

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

  @Post('/refresh')
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
