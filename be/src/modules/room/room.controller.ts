import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common'
import { RoomService } from './room.service'
import { GetCurrentUser } from 'src/decorators/auth.user.decorator'
import { CreateRoomDto } from './dto/create.room.dto'
import { Response } from 'src/utils/response.type'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

@Controller('rooms')
@UseGuards(JwtAuthGuard)
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  getRooms() {
    return { msg: 'success' }
  }

  @Get(':id')
  async getRoomById(@Param('id', ParseIntPipe) id: number) {
    const result = await this.roomService.getRoomById(id)
    return Response({
      message: 'success',
      statusCode: HttpStatus.OK,
      result
    })
  }

  @Get('search')
  searchRooms(@Query() searchRoomsDto: any) {
    return { msg: 'success' }
  }

  @Post()
  async createRoom(@GetCurrentUser() user: any, @Body() createRoomDto: CreateRoomDto) {
    const result = await this.roomService.createRoom(createRoomDto, user)
    return Response({
      statusCode: HttpStatus.OK,
      message: 'success',
      result
    })
  }

  @Put()
  updateRoom() {
    return { msg: 'success' }
  }

  @Delete(':id')
  deleteRoom(@Param('id', ParseIntPipe) id: number) {
    return { msg: 'success' }
  }
}
