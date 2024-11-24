import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { UsersModule } from '../users/users.module'
import { RolesModule } from '../roles/roles.module'
import { AuthModule } from '../auth/auth.module'
import { RoomsModule } from '../rooms/rooms.module'

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.env.${process.env.NODE_ENV}` }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.n6rx4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
    ),
    UsersModule,
    RolesModule,
    AuthModule,
    RoomsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
