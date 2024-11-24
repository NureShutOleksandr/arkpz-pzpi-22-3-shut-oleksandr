import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { UsersService } from './users.service'
import { User, UserDocument } from './users.schema'
import { CreateUserDto } from './dto/create-user.dto'

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Get all users ' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  getAllUser(): Promise<UserDocument[]> {
    return this.usersService.getAllUsers()
  }

  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({ status: 200, type: [User] })
  @Get('/:id')
  getUser(@Param('id') id: string): Promise<UserDocument> {
    return this.usersService.getUserById(id)
  }

  @ApiOperation({ summary: 'User creation' })
  @ApiResponse({ status: 200, type: User })
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() dto: CreateUserDto): Promise<UserDocument> {
    return this.usersService.create(dto)
  }
}
