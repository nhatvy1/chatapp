import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToMany
} from 'typeorm'
import { Message } from '../message/message.entity'
import { Room } from '../room/room.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  fullName: string

  @Column({ unique: true })
  email: string

  @Column({ type: String, nullable: false })
  password: string

  @Column({
    default:
      'https://res.cloudinary.com/metavere/image/upload/v1695267123/ConBo_eij0q0.png',
  })
  avatar: string

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date

  @OneToMany(() => Message, (message) => message.owner)
  messages: Message[]

  @OneToMany(()=> Room, (room)=> room.owner)
  rooms: Room[]

  @ManyToMany(()=> Room, (room)=> room.members)
  joinedRooms: Room[]
}
