import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';

export class SignUpDto extends CreateUserDto {}

export type SessionData = {
  userId: User['id'];
  username: User['name'];
};
