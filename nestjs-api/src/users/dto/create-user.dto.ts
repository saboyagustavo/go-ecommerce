import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { UserRole } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEmail(undefined, {
    message: `Please enter a valid email address like 'example@example.com'`,
  })
  email: string;

  @ApiProperty({ minLength: 6 })
  @IsString()
  @IsNotEmpty()
  @MinLength(6, {
    message: 'Your password must contain at least 6 digits or over',
  })
  password: string;

  role: UserRole;
}
