import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
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
  getRoles(): Promise<RoleDocument[]> {
    return this.roleService.getRoles()
  }

  @ApiOperation({ summary: 'Get role by value' })
  @ApiResponse({ status: 200, type: Role })
  @Get('/:value')
  getByValue(@Param('value') value: string): Promise<RoleDocument> {
    return this.roleService.getRoleByValue(value)
  }

  @ApiOperation({ summary: 'Create role' })
  @ApiResponse({ status: 200, type: Role })
  @Post()
  create(@Body() dto: CreateRoleDto): Promise<RoleDocument> {
    dto.value = dto.value.toUpperCase()
    return this.roleService.createRole(dto)
  }

  @ApiOperation({ summary: 'Update role' })
  @ApiResponse({ status: 200, type: Role })
  @Patch()
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
