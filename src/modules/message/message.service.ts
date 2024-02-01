import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateMessageDto } from './dtos/createMessage.dto';
import { Message } from '@modules/database/schemas/message.schema';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private readonly messageModel: Model<Message>,
  ) {}

  create(createMessageDto: CreateMessageDto): Promise<Message> {
    const { from, to, message } = createMessageDto;
    return this.messageModel.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });
  }

  getMessagesByUserIdPair(from: string, to: string): Promise<Array<Message>> {
    return this.messageModel
      .find({
        users: {
          $all: [from, to],
        },
      })
      .sort({ updatedAt: 1 });
  }
}
