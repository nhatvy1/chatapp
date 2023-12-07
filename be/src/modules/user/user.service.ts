import { ConflictException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './user.entity'
import { Repository } from 'typeorm'
import { RegisterDto } from '../auth/dto/register.dto'
import { Hash } from 'src/utils/hash'
import { LoginDto } from '../auth/dto/login.dto'
import { CloudinaryService } from '../cloudinary/cloudinary.service'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private cloudinaryService: CloudinaryService,
  ) {}

  async findAll() {
    const result = await this.userRepository.find({
      select: ['id', 'fullName', 'email', 'avatar'],
    })
    return result
  }

  async findUserById(id: number) {
    const result = await this.userRepository.findOneBy({ id })
    return result
  }

  getUserByEmail(email: string) {
    return this.userRepository.findOne({
      where: [{ email: email }],
    })
  }

  async createUser(signUpDto: RegisterDto, avatar: any) {
    const foundUser = await this.getUserByEmail(signUpDto.email)
    if (foundUser) {
      throw new ConflictException('Email or phone already in use')
    }

    const urlImage = await this.cloudinaryService.uploadImage(avatar)
    const hashPassword = Hash.generateHash(signUpDto.password)
    const user = this.userRepository.create({
      fullName: signUpDto.fullName,
      email: signUpDto.email,
      avatar: urlImage.url,
      password: hashPassword,
    })
    await this.userRepository.save(user)
    return user
  }

  login(signInDto: LoginDto): Promise<User> {
    return this.userRepository
      .createQueryBuilder()
      .addSelect('password')
      .where({ email: signInDto.email })
      .getOne()
  }
}
