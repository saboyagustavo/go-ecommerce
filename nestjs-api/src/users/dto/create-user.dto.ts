import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail(undefined, {
    message: `Please enter a valid email address like 'example@example.com'`,
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, {
    message: 'Your password must contain at least 6 digits or over',
  })
  password: string;

  role: UserRole;
}
