import { AuthService } from '@modules/auth/auth.service';
import { UserService } from '@modules/user/user.service';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  connectedUsers: Map<string, string> = new Map();

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  async handleConnection(client: Socket): Promise<void> {
    // const token = client.handshake.query.token.toString();
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: any) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('add-user')
  handleAddUser(
    @MessageBody() userId: string,
    @ConnectedSocket() client: Socket,
  ) {
    this.connectedUsers.set(userId, client.id);
    console.log('all client connecting', this.connectedUsers);
  }

  @SubscribeMessage('send-message')
  handleMessage(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    const sendUserSocket = this.connectedUsers.get(data.to);
    if (sendUserSocket) {
      client.to(sendUserSocket).emit('message-receive', data.message);
    }
  }

  @SubscribeMessage('log-out')
  handleLogout(@MessageBody() userId: string) {
    this.connectedUsers.delete(userId);
  }
}
