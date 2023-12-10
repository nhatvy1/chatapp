import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Message } from "./message.entity";
import { MessageController } from "./message.controller";
import { MessageService } from "./message.service";
import { RoomModule } from "../room/room.module";
import { UserModule } from "../user/user.module";

@Module({
    imports: [TypeOrmModule.forFeature([Message]), RoomModule, UserModule],
    controllers: [MessageController],
    providers: [MessageService]
})
export class MessageModule {}