import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../database/schemas/user.schema';
import { HTTP_CODE } from 'src/shared/constants';
import { JwtAuthGuard } from '../auth/guards/jwtAuth.guard';

@Controller('/api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(HTTP_CODE.SUCCESS)
  findAll(): Promise<Array<User>> {
    return this.userService.findAll();
  }

  @Get('/:id/friends')
  @HttpCode(HTTP_CODE.SUCCESS)
  findFriends(@Param('id') id: string): Promise<Array<User>> {
    return this.userService.findFriends(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id/setDisplayName')
  @HttpCode(HTTP_CODE.SUCCESS)
  upsertDisplayName(
    @Param('id') id: string,
    @Body('displayName') displayName: string,
  ): Promise<User> {
    return this.userService.upsertDisplayName(id, displayName);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id/setAvatar')
  @HttpCode(HTTP_CODE.SUCCESS)
  upsertAvatar(
    @Param('id') id: string,
    @Body('avatarImage') avatarImage: string,
  ) {
    return this.userService.upsertAvatar(id, avatarImage);
  }

  @Get('/:id')
  @HttpCode(HTTP_CODE.SUCCESS)
  findUser(@Param('id') id: string): Promise<User> {
    return this.userService.findById(id);
  }
}
