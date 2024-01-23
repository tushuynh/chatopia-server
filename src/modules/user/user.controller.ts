import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../database/schemas/user.schema';
import { JwtAuthGuard } from '../auth/guards/jwtAuth.guard';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ParseObjectIdPipe } from 'src/core/pipes/parseObjectId.pipe';
import { SetDisplayNameDto } from './dtos/setDisplayName.dto';
import { SetAvatarDto } from './dtos/setAvatar.dto';
import { UpsertAvatarResponse } from './responses/upsertAvatar.response';

@ApiTags('Users')
@Controller('/api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({
    type: User,
    isArray: true,
  })
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Array<User>> {
    return this.userService.findAll();
  }

  @Get('/:id/friends')
  @ApiOperation({ summary: 'Get all friends by user id' })
  @ApiOkResponse({ type: User })
  @HttpCode(HttpStatus.OK)
  findFriends(
    @Param('id', ParseObjectIdPipe) id: string,
  ): Promise<Array<User>> {
    return this.userService.findFriends(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id/setDisplayName')
  @ApiOperation({ summary: 'Update display name by user id' })
  @ApiBody({ type: SetDisplayNameDto })
  @ApiOkResponse({ type: User })
  @HttpCode(HttpStatus.OK)
  upsertDisplayName(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body('displayName') displayName: string,
  ): Promise<User> {
    return this.userService.upsertDisplayName(id, displayName);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id/setAvatar')
  @ApiOperation({ summary: 'Update avatar image by user id' })
  @ApiBody({ type: SetAvatarDto })
  @ApiOkResponse({ type: UpsertAvatarResponse })
  @HttpCode(HttpStatus.OK)
  upsertAvatar(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body('avatarImage') avatarImage: string,
  ): Promise<UpsertAvatarResponse> {
    return this.userService.upsertAvatar(id, avatarImage);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get a user by id' })
  @ApiOkResponse({ type: User })
  @HttpCode(HttpStatus.OK)
  findUser(@Param('id', ParseObjectIdPipe) id: string): Promise<User> {
    return this.userService.findById(id);
  }
}
