import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ChatModule } from './modules/chat/chat.module';
import { ConfigModule } from '@nestjs/config';
import config from './config/config';
import { DatabaseModule } from './modules/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { MessageModule } from './modules/message/message.module';

const modules = [
  DatabaseModule,
  UserModule,
  ChatModule,
  AuthModule,
  MessageModule,
];

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    ...modules,
  ],
})
export class AppModule {}
