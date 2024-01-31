import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/modules/database/schemas/user.schema';

export class Token {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}

export class LoginResponse {
  @ApiProperty()
  user: User;

  @ApiProperty()
  tokens: Token;
}
