import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SetDisplayNameDto } from './dtos/setDisplayName.dto';
import { SetAvatarDto } from './dtos/setAvatar.dto';
import { UpdateAvatarResponse } from './responses/updateAvatar.response';
import { User } from '@modules/database/schemas/user.schema';
import { ApiResponseCustom } from '@core/decorators/apiOkResponse.decorator';
import { ParseObjectIdPipe } from '@core/pipes/parseObjectId.pipe';

@ApiTags('Users')
@Controller('/api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponseCustom(HttpStatus.OK, User, true)
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Array<User>> {
    return this.userService.findAll();
  }

  @Get('/:id/friends')
  @ApiOperation({ summary: 'Get all friends by user id' })
  @ApiResponseCustom(HttpStatus.OK, User, true)
  @HttpCode(HttpStatus.OK)
  findFriends(
    @Param('id', ParseObjectIdPipe) id: string,
  ): Promise<Array<User>> {
    return this.userService.findFriends(id);
  }

  // @UseGuards(JwtAuthGuard)
  @Put('/:id/setDisplayName')
  @ApiOperation({ summary: 'Update display name by user id' })
  @ApiBody({ type: SetDisplayNameDto })
  @ApiResponseCustom(HttpStatus.OK, User)
  @HttpCode(HttpStatus.OK)
  updateDisplayName(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body('displayName') displayName: string,
  ): Promise<User> {
    return this.userService.updateDisplayName(id, displayName);
  }

  // @UseGuards(JwtAuthGuard)
  @Put('/:id/setAvatar')
  @ApiOperation({ summary: 'Update avatar image by user id' })
  @ApiBody({ type: SetAvatarDto })
  @ApiResponseCustom(HttpStatus.OK, UpdateAvatarResponse)
  @HttpCode(HttpStatus.OK)
  updateAvatar(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body('avatarImage') avatarImage: string,
  ): Promise<UpdateAvatarResponse> {
    return this.userService.updateAvatar(id, avatarImage);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get a user by id' })
  @ApiResponseCustom(HttpStatus.OK, User)
  @HttpCode(HttpStatus.OK)
  findUser(@Param('id', ParseObjectIdPipe) id: string): Promise<User> {
    return this.userService.findById(id);
  }
}
