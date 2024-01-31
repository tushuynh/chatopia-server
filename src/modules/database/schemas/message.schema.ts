import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

class MessageObject {
  @Prop({ required: true })
  text: string;
}

@Schema({ timestamps: true })
export class Message {
  @Prop({ required: true })
  message: MessageObject;

  @Prop()
  users: Array<string>;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  sender: Types.ObjectId;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
