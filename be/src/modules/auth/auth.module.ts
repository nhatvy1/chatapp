import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { JWT_EXPIRES, JWT_SECRET } from 'src/utils/constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';
import { UserModule } from '../user/user.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [
    UserModule,
    CloudinaryModule,
    JwtModule.registerAsync({
      useFactory: (): JwtModuleOptions => ({
        secret: JWT_SECRET,
        signOptions: {
          expiresIn: JWT_EXPIRES,
        },
      }),
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
})
export class AuthModule {}
