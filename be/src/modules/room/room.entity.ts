import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
	ManyToOne,
  ManyToMany,
  JoinTable
} from 'typeorm'
import { Message } from '../message/message.entity'
import { User } from '../user/user.entity'

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  description: string

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date

  @OneToMany(() => Message, (message) => message.room)
  messages: Message[]

	@ManyToOne(() => User, (user) => user.rooms)
  owner: User;

  @ManyToMany(()=> User, (user)=> user.joinedRooms)
  @JoinTable()
  members: User[]
}
