import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User extends Model<User> {
  _id: Types.ObjectId;

  @Prop({
    required: true,
    min: 3,
    max: 20,
    unique: true,
  })
  username: string;

  @Prop({ max: 20 })
  displayName: string;

  @Prop({
    required: true,
    unique: true,
    max: 50,
  })
  email: string;

  @Prop({
    required: true,
    min: 8,
    select: false,
  })
  password: string;

  @Prop({ default: false })
  isAvatarImageSet: boolean;

  @Prop({ default: '' })
  avatarImage: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.set('toJSON', {
  transform: (doc, ret, opt) => {
    delete ret['password'];
    return ret;
  },
});
