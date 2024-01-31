import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginResponse } from './responses/login.response';
import { ApiResponseCustom } from 'src/core/decorators/apiOkResponse.decorator';

@ApiTags('Auth')
@Controller('/api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @ApiOperation({ summary: 'Login with username and password' })
  @ApiResponseCustom(HttpStatus.OK, LoginResponse)
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<LoginResponse> {
    const user = req.user as User;
    const tokens = await this.authService.login(user as User);

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      maxAge: this.configService.get('jwt').refreshExpire,
    });

    return { user, tokens };
  }

  @Post('/register')
  @ApiOperation({ summary: 'Register a user' })
  @ApiResponseCustom(HttpStatus.CREATED, LoginResponse)
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<LoginResponse> {
    const response = await this.authService.register(createUserDto);

    res.cookie('refreshToken', response.tokens.refreshToken, {
      httpOnly: true,
      maxAge: this.configService.get('jwt').refreshExpire,
    });

    return response;
  }
}
