import { IsNotEmpty, MaxLength, MinLength } from 'class-validator'
import { Room } from 'src/modules/room/room.entity'
import { User } from 'src/modules/user/user.entity'
import { IsNull } from 'typeorm'

export class CreateMessageDto {
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(255)
  text: string

  @IsNotEmpty()
  room: number
}
