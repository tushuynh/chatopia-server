import { ApiProperty } from '@nestjs/swagger';

export class UpsertAvatarResponse {
  @ApiProperty()
  isSet: boolean;

  @ApiProperty()
  image: string;
}
