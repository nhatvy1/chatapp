import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Socket, Server } from 'socket.io'
import { MessageService } from '../message/message.service'

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly messageService: MessageService) {}

  @WebSocketServer()
  sever: Server

  afterInit(server: Server) {
    console.log(server)
  }

  @SubscribeMessage('join-room')
  handleJoinRoom(client: Socket, room: string) {
    console.log('Join room: ', room)
    client.join(room)
    client.emit('joined-room', room)
  }

  @SubscribeMessage('leave-room')
  handleLeaveRoom(client: Socket, room: string) {
    console.log('Left room: ', room)
    client.leave(room)
    client.emit('left-room', room)
  }

  @SubscribeMessage('send-message')
  async handleSendMessage(client: Socket, data: any) {
    const response = await this.messageService.createMessageBySocket(data)
    console.log('Check data: ', data)
    this.sever.to(data.room).emit('receive-message', response)
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Connected ${client.id}`)
  }

  handleDisconnect(client: Socket) {
    console.log(`Disconnected ${client.id}`)
  }
}
