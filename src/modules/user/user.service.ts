import { InjectModel } from '@nestjs/mongoose';
import { User } from './../database/schemas/user.schema';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateUserDto } from './dtos/createUser.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  findAll(): Promise<Array<User>> {
    return this.userModel.find();
  }

  findFriends(id: string): Promise<Array<User>> {
    return this.userModel.find({ _id: { $ne: id } });
  }

  upsertDisplayName(id: string, displayName: string): Promise<User> {
    return this.userModel.findOneAndUpdate(
      {
        _id: id,
      },
      {
        displayName,
      },
      { new: true },
    );
  }

  async upsertAvatar(id: string, avatarImage: string): Promise<object> {
    const user = await this.userModel.findByIdAndUpdate(
      id,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      {
        new: true,
      },
    );

    return {
      isSet: user.isAvatarImageSet,
      image: user.avatarImage,
    };
  }

  findById(id: string): Promise<User> {
    return this.userModel.findById(id);
  }

  findByUsername(username: string, password?: boolean): Promise<User | null> {
    const user = this.userModel.findOne({ username });
    if (password) {
      user.select('+password');
    }

    return user;
  }

  findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email });
  }

  create(user: CreateUserDto): Promise<User> {
    return this.userModel.create(user);
  }
}