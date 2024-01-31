import { ApiProperty } from '@nestjs/swagger';

export class GetMessagesResponse {
  @ApiProperty()
  fromSelf: boolean;

  @ApiProperty()
  message: string;
}
