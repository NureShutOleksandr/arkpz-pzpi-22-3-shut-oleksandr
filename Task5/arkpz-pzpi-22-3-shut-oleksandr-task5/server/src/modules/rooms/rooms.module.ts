import { forwardRef, Module } from '@nestjs/common'
import { RoomsController } from './rooms.controller'
import { RoomsService } from './rooms.service'
import { MongooseModule } from '@nestjs/mongoose'
import { Room, RoomSchema } from './rooms.schema'
import { UsersModule } from '../users/users.module'
import { NotificationsModule } from '../notifications/notifications.module'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
    forwardRef(() => UsersModule),
    NotificationsModule,
  ],
  controllers: [RoomsController],
  providers: [RoomsService],
  exports: [RoomsService],
})
export class RoomsModule {}
