import { ApiProperty } from '@nestjs/swagger';

export class UpdateAvatarResponse {
  @ApiProperty()
  isSet: boolean;

  @ApiProperty()
  image: string;
}
