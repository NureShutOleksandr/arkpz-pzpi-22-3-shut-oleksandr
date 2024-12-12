import { forwardRef, Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from './users.schema'
import { RolesModule } from '../roles/roles.module'
import { RoomsModule } from '../rooms/rooms.module'
import { Room, RoomSchema } from '../rooms/rooms.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
    RolesModule,
    forwardRef(() => RoomsModule),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
