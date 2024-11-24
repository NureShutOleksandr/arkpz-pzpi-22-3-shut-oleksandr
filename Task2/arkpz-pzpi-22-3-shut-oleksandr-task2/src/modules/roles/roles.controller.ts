import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { RolesService } from './roles.service'
import { CreateRoleDto } from './dto/create-role.dto'
import { Role, RoleDocument } from './roles.schema'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly roleService: RolesService) {}

  @ApiOperation({ summary: 'Create role' })
  @ApiResponse({ status: 200, type: Role })
  @Post()
  create(@Body() dto: CreateRoleDto): Promise<RoleDocument> {
    return this.roleService.createRole(dto)
  }

  @ApiOperation({ summary: 'Get role by value' })
  @ApiResponse({ status: 200, type: Role })
  @Get('/:value')
  getByValue(@Param('value') value: string): Promise<RoleDocument> {
    return this.roleService.getRoleByValue(value)
  }
}
