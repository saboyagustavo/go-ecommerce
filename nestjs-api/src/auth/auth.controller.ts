import { Controller, Post, UseGuards, Req, Body } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto, SignInResponse } from './dto/auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiCreatedResponse({ type: SignInResponse })
  @Post('login')
  // eslint-disable-next-line
  async login(@Req() req, @Body() _: LoginDto) {
    const { user } = req;
    return this.authService.login(user);
  }
}
