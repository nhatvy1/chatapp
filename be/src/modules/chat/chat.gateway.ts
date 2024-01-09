import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Socket, Server } from 'socket.io'

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  sever: Server

  afterInit(server: Server) {
    console.log(server)
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Connected ${client.id}`)
  }

  handleDisconnect(client: Socket) {
    console.log(`Disconnected ${client.id}`)
  }
}
