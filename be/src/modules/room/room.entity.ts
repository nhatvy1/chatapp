import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
	ManyToOne
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

  @OneToMany(() => Message, (message) => message.room)
  messages: Message[]

	@ManyToOne(() => User, (user) => user.rooms)
  owner: User;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date
}
