import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';

export class LoginDto {
  @ApiProperty()
  email: string;

  @ApiProperty({ minLength: 6 })
  password: string;
}

export class SignUpDto extends CreateUserDto {}

export class SignInResponse {
  @ApiProperty()
  access_token: string;
}

export type SessionData = {
  userId: User['id'];
  username: User['name'];
};
