import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { RolesService } from './roles.service'
import { CreateRoleDto } from './dto/create-role.dto'
import { Role, RoleDocument } from './roles.schema'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { UpdateRoleDto } from './dto/update-role.dto'

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly roleService: RolesService) {}

  @ApiOperation({ summary: 'Get all roles ' })
  @ApiResponse({ status: 200, type: [Role] })
  @Get()
  @HttpCode(HttpStatus.OK)
  getRoles(): Promise<RoleDocument[]> {
    return this.roleService.getRoles()
  }

  @ApiOperation({ summary: 'Get role by value' })
  @ApiResponse({ status: 200, type: Role })
  @Get('/:value')
  @HttpCode(HttpStatus.OK)
  getByValue(@Param('value') value: string): Promise<RoleDocument> {
    return this.roleService.getRoleByValue(value)
  }

  @ApiOperation({ summary: 'Create role' })
  @ApiResponse({ status: 201, type: Role })
  @UsePipes(ValidationPipe)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateRoleDto): Promise<RoleDocument> {
    dto.value = dto.value.toUpperCase()
    return this.roleService.createRole(dto)
  }

  @ApiOperation({ summary: 'Update role' })
  @ApiResponse({ status: 200, type: Role })
  @UsePipes(ValidationPipe)
  @Patch()
  @HttpCode(HttpStatus.OK)
  update(@Body() dto: UpdateRoleDto): Promise<RoleDocument> {
    return this.roleService.updateRole(dto)
  }

  @ApiOperation({ summary: 'Delete role' })
  @ApiResponse({ status: 200, type: Role })
  @Delete('/:id')
  delete(@Param('id') id: string): Promise<RoleDocument> {
    return this.roleService.deleteRole(id)
  }
}
