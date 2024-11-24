import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Role, RoleDocument } from './roles.schema'
import { Model } from 'mongoose'
import { CreateRoleDto } from './dto/create-role.dto'

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>) {}

  async createRole(dto: CreateRoleDto): Promise<RoleDocument> {
    const isExist = await this.roleModel.exists({ value: dto.value })

    if (isExist) throw new HttpException('Role already exist', HttpStatus.BAD_REQUEST)

    const role = new this.roleModel(dto)
    return role.save()
  }

  async getRoleByValue(value: string): Promise<RoleDocument> {
    const role = await this.roleModel.findOne({ value }).exec()

    if (!role) throw new HttpException('Role not found by this name', HttpStatus.NOT_FOUND)

    return role
  }
}
