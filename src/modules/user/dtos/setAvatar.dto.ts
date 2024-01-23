import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SetAvatarDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  avatarImage: string;
}
