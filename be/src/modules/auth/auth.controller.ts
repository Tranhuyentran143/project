import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from 'src/core/dto/auth.dto';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() bodyLogin: AuthDto) {
    try {
      return this.authService.signIn(bodyLogin.user_name, bodyLogin.password);
    } catch (err) {
      console.log(err);
      return 1;
    }
  }
}
