import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { UserModule } from '@modules/user/user.module';
import { AuthModule } from '@modules/auth/auth.module';

@Module({
  imports: [UserModule, AuthModule],
  providers: [ChatGateway],
})
export class ChatModule {}
