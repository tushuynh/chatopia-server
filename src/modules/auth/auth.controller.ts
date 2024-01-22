import { HTTP_CODE } from 'src/shared/constants';
import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from '../user/dtos/createUser.dto';
import { LoginUserDto } from '../user/dtos/loginUser.dto';
import { LocalAuthGuard } from './guards/localAuth.guard';
import { User } from '../database/schemas/user.schema';

@Controller('/api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @HttpCode(HTTP_CODE.SUCCESS)
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { user } = req;
    const tokens = await this.authService.login(user as User);

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      maxAge: this.configService.get('jwt').refreshExpire,
    });

    return { status: true, user, tokens };
  }

  @Post('/register')
  @HttpCode(HTTP_CODE.SUCCESS)
  async register(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const response = await this.authService.register(createUserDto);

    res.cookie('refreshToken', response.tokens.refreshToken, {
      httpOnly: true,
      maxAge: this.configService.get('jwt').refreshExpire,
    });

    return response;
  }
}
