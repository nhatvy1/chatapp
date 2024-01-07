import { ConflictException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Room } from './room.entity'
import { Repository } from 'typeorm'
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

  async createRoom(createRoomDto: CreateRoomDto, user: any) {
    const user1 = await this.userService.findUserById(user.userId)
    const user2 = await this.userService.findUserById(createRoomDto.member)

    const findRoom = await this.roomRepository
      .createQueryBuilder('room')
      .innerJoinAndSelect('room.members', 'user')
      .where('user.id IN (:...userArr)', { userArr: [user1.id, user2.id] })
      .getOne()
    if (findRoom) {
      throw new ConflictException('Room existed.')
    }

    const room = this.roomRepository.create({
      title: createRoomDto.title,
      description: createRoomDto.description,
      members: [user1, user2],
    })

    await this.roomRepository.save(room)

    return room
  }
}
