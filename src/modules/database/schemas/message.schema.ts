import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Message {
  @Prop()
  message: string;

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
