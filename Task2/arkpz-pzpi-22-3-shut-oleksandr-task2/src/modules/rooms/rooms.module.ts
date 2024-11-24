import { forwardRef, Module } from '@nestjs/common'
import { RoomsController } from './rooms.controller'
import { RoomsService } from './rooms.service'
import { MongooseModule } from '@nestjs/mongoose'
import { Room, RoomSchema } from './rooms.schema'
import { UsersModule } from '../users/users.module'

@Module({
  imports: [MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]), forwardRef(() => UsersModule)],
  controllers: [RoomsController],
  providers: [RoomsService],
  exports: [RoomsService],
})
export class RoomsModule {}
