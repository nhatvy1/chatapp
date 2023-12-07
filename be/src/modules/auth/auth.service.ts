import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../user/user.entity'
import { JwtService } from '@nestjs/jwt'
import { JwtPayload } from './interfaces/jwt.payload.interface'
import { JWT_EXPIRES, JWT_SECRET, REFRESH_JWT_EXPIRES, REFRESH_JWT_SECRET } from 'src/utils/constants'
import { TokenVerify, Tokens } from './interfaces/token.interface'
import { RegisterDto } from './dto/register.dto'
import { UserService } from '../user/user.service'
import { Hash } from 'src/utils/hash'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {}

  async generateToken(userId: number, fullName: string): Promise<Tokens> {
    const payload: JwtPayload = { userId, fullName };
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: JWT_SECRET,
        expiresIn: JWT_EXPIRES,
      }),
      this.jwtService.signAsync(payload, {
        secret: REFRESH_JWT_SECRET,
        expiresIn: REFRESH_JWT_EXPIRES,
      }),
    ]);

    return { access_token: access_token, refresh_token: refresh_token };
  }

  async refreshToken(tokenVerify: TokenVerify) {
    const { access_token, refresh_token } = await this.generateToken(
      tokenVerify.userId,
      tokenVerify.fullName,
    );
    return { access_token, refresh_token };
  }

  async register(signUpDto: RegisterDto, avatar: any) {
    const user = await this.userService.createUser(signUpDto, avatar);
    const { access_token, refresh_token } = await this.generateToken(
      user.id,
      user.fullName,
    );
    return { user, access_token, refresh_token };
  }

  async login(signInDto: any) {
    const user = await this.userService.login(signInDto);

    if (!user) {
      throw new UnauthorizedException('Email hoặc mật khẩu không hợp lệ');
    }
    const isValidPassword = Hash.compare(signInDto.password, user.password);
    if (!isValidPassword) {
      throw new UnauthorizedException('Mật khẩu không hợp lệ');
    }

    const { access_token, refresh_token }: Tokens = await this.generateToken(
      user.id,
      user.fullName,
    );
    delete user.password;
    return { user, access_token, refresh_token };
  }
}
