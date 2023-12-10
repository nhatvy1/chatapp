import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
} from 'typeorm'
import { User } from '../user/user.entity'
import { Room } from '../room/room.entity'

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  text: string

  // @Column('text', { array: true })
  @Column({ type: 'text', array: true, nullable: true })
  images: string[]

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @ManyToOne(() => User, (user) => user.messages)
  owner: User

  @ManyToOne(() => Room, (room) => room.messages)
  room: Room
}
