import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

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
}
