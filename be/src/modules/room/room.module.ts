import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Room } from './room.entity'
import { RoomController } from './room.controller'
import { RoomService } from './room.service'
import { UserModule } from '../user/user.module'

@Module({
  imports: [TypeOrmModule.forFeature([Room]), UserModule],
  controllers: [RoomController],
  providers: [RoomService],
  exports: [RoomService]
})
export class RoomModule {}
