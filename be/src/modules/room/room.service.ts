import { ConflictException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Room } from './room.entity'
import { ArrayContains, Repository } from 'typeorm'
import { CreateRoomDto } from './dto/create.room.dto'
import { UserService } from '../user/user.service'

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room) private readonly roomRepository: Repository<Room>,
    private readonly userService: UserService,
  ) {}

  getRoomById(id: number) {
    return this.roomRepository.findOneBy({ id })
  }

  async getRoomByTwoUser(memberId: number, user: any) {
    const findRoom = await this.roomRepository.findOne({
      where: {
        listUser: ArrayContains([memberId, user.userId])
      }
    })

    return findRoom
  }

  async createRoom(createRoomDto: CreateRoomDto, user: any) {
    const checkExistRoom = await this.getRoomByTwoUser(createRoomDto.member, user)
    if(checkExistRoom) {
      throw new ConflictException('Room existed')
    }
  
    const user1 = await this.userService.findUserById(user.userId)
    const user2 = await this.userService.findUserById(createRoomDto.member)

    const room = this.roomRepository.create({
      title: createRoomDto.title,
      description: createRoomDto.description,
      listUser: [user.userId, createRoomDto.member],
      members: [user1, user2],
    })

    await this.roomRepository.save(room)
    return room
  }
}
