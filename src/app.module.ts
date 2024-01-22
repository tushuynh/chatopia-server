import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ChatModule } from './modules/chat/Chat.module';
import { ConfigModule } from '@nestjs/config';
import config from './config/config';
import { DatabaseModule } from './modules/database/database.module';
import { AuthModule } from './modules/auth/auth.module';

const modules = [DatabaseModule, UserModule, ChatModule, AuthModule];

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    ...modules,
  ],
})
export class AppModule {}
