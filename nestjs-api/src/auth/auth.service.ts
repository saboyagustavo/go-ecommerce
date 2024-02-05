import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SessionData, SignInResponse } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<SessionData> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const validPassword = await bcrypt.compare(pass, user.password);

    if (!validPassword) {
      throw new UnauthorizedException();
    }

    return { userId: user.id, username: user.name };
  }

  async login(sessionData: SessionData): Promise<SignInResponse> {
    return {
      access_token: this.jwtService.sign(sessionData),
    };
  }

  decodeToken(token: string) {
    return this.jwtService.decode(token);
  }
}
