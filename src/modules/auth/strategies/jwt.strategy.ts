import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './interfaces/jwtPayload.interface';
import { UserService } from '@modules/user/user.service';
import { User } from '@modules/database/schemas/user.schema';
import { ERROR_MESSAGE } from '@shared/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwt').accessKey,
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const user = await this.userService.findById(payload.id);
    if (!user) {
      throw new UnauthorizedException(ERROR_MESSAGE.TOKEN_INVALID);
    }

    return user;
  }
}
