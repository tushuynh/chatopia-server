import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from '../user/dtos/createUser.dto';
import { ERROR_MESSAGE } from 'src/shared/constants';
import { User } from '../database/schemas/user.schema';
import { Model } from 'mongoose';
import { LoginResponse, Token } from './responses/login.response';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<LoginResponse> {
    const { email, username, password } = createUserDto;

    const isUsernameExisting = await this.userService.findByUsername(username);
    if (isUsernameExisting) {
      throw new BadRequestException({
        status: false,
        msg: ERROR_MESSAGE.USERNAME_ALREADY_EXISTED,
      });
    }

    const isEmailExisting = await this.userService.findByEmail(email);
    if (isEmailExisting) {
      throw new BadRequestException({
        status: false,
        msg: ERROR_MESSAGE.EMAIL_ALREADY_EXISTED,
      });
    }

    const hashedPassword = await this.hashPassword(password);
    const user = await this.userService.create({
      email,
      username,
      password: hashedPassword,
      displayName: username,
    });
    const tokens = this.generateTokens(user._id.toString());

    return { status: true, user, tokens };
  }

  async login(user: User): Promise<Token> {
    const tokens = this.generateTokens(user._id.toString());
    return tokens;
  }

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userService.findByUsername(username, true);
    if (!user) {
      throw new UnauthorizedException({
        status: false,
        msg: ERROR_MESSAGE.USERNAME_OR_PASSWORD_INVALID,
      });
    }

    const isValidPassword = await compare(password, user.password);
    if (!isValidPassword) {
      throw new UnauthorizedException({
        status: false,
        msg: ERROR_MESSAGE.USERNAME_OR_PASSWORD_INVALID,
      });
    }

    const userObj = user.toObject();
    delete userObj.password;
    return userObj;
  }

  generateTokens(id: string) {
    const payload = { id };
    const jwt = this.configService.get('jwt');

    const accessToken = this.jwtService.sign(payload, {
      secret: jwt.accessKey,
      expiresIn: jwt.accessExpire,
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: jwt.refreshKey,
      expiresIn: jwt.refreshExpire,
    });

    return { accessToken, refreshToken };
  }

  hashPassword(password: string): Promise<string> {
    return hash(password, 10);
  }
}
