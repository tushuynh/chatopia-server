import { User } from '@modules/database/schemas/user.schema';
import { ApiProperty } from '@nestjs/swagger';

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
