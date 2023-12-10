import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, Res, UseGuards } from '@nestjs/common'
import { MessageService } from './message.service'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { GetCurrentUser } from 'src/decorators/auth.user.decorator'
import { CreateMessageDto } from './dto/create.message.dto'
import { Response } from 'src/utils/response.type'

@Controller('messages')
@UseGuards(JwtAuthGuard)
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get(':id')
  async getMessages(@Param('id', ParseIntPipe) id: number) {
    const result = await this.messageService.getMessage(id)
    return Response({ 
      message: 'success',
      statusCode: HttpStatus.OK,
      result
    })
  }

  @Post()
  async createMessage(
    @GetCurrentUser() user: any,
    @Body() createMessageDto: CreateMessageDto,
  ) {
    const result = await this.messageService.createMessage(user, createMessageDto)
    return Response({
      message: 'success',
      statusCode: HttpStatus.OK,
      result
    })
  }
}
