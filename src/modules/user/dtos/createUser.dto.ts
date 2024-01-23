import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Min(3)
  @Max(20)
  username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Min(8)
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Max(50)
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Max(20)
  displayName: string;

  @ApiProperty({ required: false, default: false })
  @IsOptional()
  @IsBoolean()
  isAvatarImageSet?: boolean = false;

  @ApiProperty({ required: false, default: '' })
  @IsOptional()
  @IsString()
  avatarImage?: string = '';
}
