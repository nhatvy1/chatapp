import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Message } from 'src/modules/message/message.entity';
import { Room } from 'src/modules/room/room.entity';
import { User } from 'src/modules/user/user.entity';

export default (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Message, Room],
  autoLoadEntities: true,
  synchronize: process.env.DB_SYNC === 'true',
});