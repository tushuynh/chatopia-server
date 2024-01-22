export class CreateUserDto {
  username: string;
  password: string;
  email: string;
  displayName: string;
  isAvatarImageSet?: boolean;
  avatarImage?: string;
}
