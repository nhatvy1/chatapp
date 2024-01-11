import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Message } from './message.entity'
import { Repository } from 'typeorm'
import { CreateMessageDto } from './dto/create.message.dto'
import { RoomService } from '../room/room.service'
import { UserService } from '../user/user.service'
import { CreateMessageDemoDto } from './dto/create.message.demo.dto'

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    private readonly roomService: RoomService,
    private readonly userService: UserService,
  ) {}

  async getMessage(id: number) {
    const result = await this.messageRepository
      .createQueryBuilder('message')
      .leftJoinAndSelect('message.owner', 'owner')
      .select(['owner.id', 'message'])
      .where('message.roomId = :roomId', { roomId: id})
      .orderBy('message.createdAt', 'ASC')
      .getMany()

    return result
  }

  async getMessageById(id: number) {
    const result = await this.messageRepository
      .createQueryBuilder('message')
      .leftJoinAndSelect('message.owner', 'owner')
      .select(['owner.id', 'message'])
      .where('message.id = :id', { id: id})
      .getOne()

      return result
    }

  async createMessage(user: any, createMessage: CreateMessageDto) {
    const findRoom = await this.roomService.getRoomById(createMessage.room)
    const findUser = await this.userService.findUserById(user.userId)
    const message = this.messageRepository.create({
      text: createMessage.text,
      owner: findUser,
      room: findRoom,
    })

    await this.messageRepository.save(message)
    // return message
  }

  async createMessageBySocket(createMessage: CreateMessageDemoDto) {
    const findRoom = await this.roomService.getRoomById(createMessage.room)
    const findUser = await this.userService.findUserById(createMessage.owner)
    const messageCreate = this.messageRepository.create({
      text: createMessage.text,
      owner: findUser,
      room: findRoom,
    })

    const response =  await this.messageRepository.save(messageCreate)
    const message = await this.getMessageById(response.id)
    return message
  }
}
