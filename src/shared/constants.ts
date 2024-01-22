export enum HTTP_CODE {
  SUCCESS = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  INTERNAL_SERVER_ERROR = 500,
}

export enum ERROR_MESSAGE {
  EMAIL_ALREADY_EXISTED = 'Email already existed!',
  USERNAME_ALREADY_EXISTED = 'Username already existed!',
  USERNAME_OR_PASSWORD_INVALID = 'Incorrect username or password!',
  TOKEN_INVALID = 'Invalid token',
}
