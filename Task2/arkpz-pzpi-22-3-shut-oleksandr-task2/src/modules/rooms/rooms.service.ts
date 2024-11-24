import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { Model, isValidObjectId } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { Room, RoomDocument } from './rooms.schema'
import { CreateRoomDto } from './dto/create-room.dto'
import { UpdateRoomDto } from './dto/update-room.dto'
import { UsersService } from '../users/users.service'

@Injectable()
export class RoomsService {
  constructor(
    @InjectModel(Room.name) private roomModel: Model<RoomDocument>,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  async getAllRooms(): Promise<RoomDocument[]> {
    return this.roomModel.find().exec()
  }

  async getRoomById(id: string): Promise<RoomDocument> {
    if (!isValidObjectId(id)) {
      throw new HttpException('Invalid room ID format', HttpStatus.BAD_REQUEST)
    }

    const room = await this.roomModel.findById(id).exec()

    if (!room) {
      throw new HttpException('Room not found', HttpStatus.NOT_FOUND)
    }

    return room
  }

  async create(dto: CreateRoomDto): Promise<RoomDocument> {
    if (!isValidObjectId(dto.user)) {
      throw new HttpException('Invalid user ID format', HttpStatus.BAD_REQUEST)
    }

    await this.usersService.getUserById(dto.user) // Check if user exists

    const room = new this.roomModel(dto)
    return room.save()
  }

  async update(dto: UpdateRoomDto): Promise<RoomDocument> {
    if (!isValidObjectId(dto.id)) {
      throw new HttpException('Invalid room ID format', HttpStatus.BAD_REQUEST)
    }

    const room = await this.roomModel.findById(dto.id).exec()
    if (!room) {
      throw new HttpException('Room not found', HttpStatus.NOT_FOUND)
    }

    const historyChange = {
      temperature: room.temperature,
      moisture: room.moisture,
      carbonDioxide: room.carbonDioxide,
      illumination: room.illumination,
      updatedAt: new Date(),
    }

    room.historyChanges.unshift(historyChange)
    Object.assign(room, dto)
    return room.save()
  }

  async delete(id: string): Promise<RoomDocument> {
    if (!isValidObjectId(id)) {
      throw new HttpException('Invalid ID format', HttpStatus.BAD_REQUEST)
    }

    const room = await this.roomModel.findByIdAndDelete(id).exec()

    if (!room) {
      throw new HttpException('Room not found', HttpStatus.NOT_FOUND)
    }

    return room
  }

  public async recordChange(id: string, changes: Partial<UpdateRoomDto>): Promise<RoomDocument> {
    if (!isValidObjectId(id)) {
      throw new HttpException('Invalid room ID format', HttpStatus.BAD_REQUEST)
    }

    const room = await this.roomModel.findById(id).exec()
    if (!room) {
      throw new HttpException('Room not found', HttpStatus.NOT_FOUND)
    }

    const historyChange = {
      temperature: room.temperature,
      moisture: room.moisture,
      carbonDioxide: room.carbonDioxide,
      illumination: room.illumination,
      updatedAt: new Date(),
    }

    room.historyChanges.unshift(historyChange)
    Object.assign(room, changes)
    return room.save()
  }

  public async deleteRoomsByUserId(id: string): Promise<void> {
    await this.roomModel.deleteMany({ user: id }).exec()
  }
}
