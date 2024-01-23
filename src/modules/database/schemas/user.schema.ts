import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, Model, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User extends Model<User> {
  @ApiProperty({ type: 'string' })
  _id: Types.ObjectId;

  @Prop({
    required: true,
    min: 3,
    max: 20,
    unique: true,
  })
  @ApiProperty()
  username: string;

  @Prop({ max: 20 })
  @ApiProperty()
  displayName: string;

  @Prop({
    required: true,
    unique: true,
    max: 50,
  })
  @ApiProperty()
  email: string;

  @Prop({
    required: true,
    min: 8,
    select: false,
  })
  password: string;

  @Prop({ default: false })
  @ApiProperty()
  isAvatarImageSet: boolean;

  @Prop({ default: '' })
  @ApiProperty()
  avatarImage: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.set('toJSON', {
  transform: (doc, ret, opt) => {
    delete ret['password'];
    return ret;
  },
});
