import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { SensorsAdapterService } from './sensors-adapter.service'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { UpdateSensorDto } from './dto/update-sensor.dto'
import { Room, RoomDocument } from '../rooms/rooms.schema'

@ApiTags('sensors-adapter')
@Controller('sensors-adapter')
export class SensorsAdapterController {
  constructor(private readonly sensorsAdapterService: SensorsAdapterService) {}

  @ApiOperation({ summary: 'Post temperature data by room id' })
  @ApiResponse({ status: 200, type: Room })
  @Post('/temperature/:id')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  postTemperature(@Param('id') id: string, @Body() dto: UpdateSensorDto): Promise<RoomDocument> {
    return this.sensorsAdapterService.updateSensorData(id, { temperature: dto.value })
  }

  @ApiOperation({ summary: 'Post moisture data by room id' })
  @ApiResponse({ status: 200, type: Room })
  @Post('/moisture/:id')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  postMoisture(@Param('id') id: string, @Body() dto: UpdateSensorDto): Promise<RoomDocument> {
    return this.sensorsAdapterService.updateSensorData(id, { moisture: dto.value })
  }

  @ApiOperation({ summary: 'Post carbon dioxide data by room id' })
  @ApiResponse({ status: 200, type: Room })
  @Post('/carbonDioxide/:id')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  postCarbonDioxide(@Param('id') id: string, @Body() dto: UpdateSensorDto): Promise<RoomDocument> {
    return this.sensorsAdapterService.updateSensorData(id, { carbonDioxide: dto.value })
  }

  @ApiOperation({ summary: 'Post illumination data by room id' })
  @ApiResponse({ status: 200, type: Room })
  @Post('/illumination/:id')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  postIllumination(@Param('id') id: string, @Body() dto: UpdateSensorDto): Promise<RoomDocument> {
    return this.sensorsAdapterService.updateSensorData(id, { illumination: dto.value })
  }
}
