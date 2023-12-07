import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import typeormConfig from './database/typeorm.config'
import { UserModule } from './modules/user/user.module'
import { AuthModule } from './modules/auth/auth.module'
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module'
import { RoomModule } from './modules/room/room.module'
import { MessageModule } from './modules/message/message.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({ useFactory: typeormConfig }),
    CloudinaryModule,
    UserModule,
    AuthModule,
    RoomModule, 
    MessageModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
