import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  signUp(@Body() authDto:AuthDto){
    return this.authService.signUp(authDto);
  }

  @Get()
  signIn(@Body() createAuthDto:AuthDto) {
    return this.authService.signIn(createAuthDto);
  }

  @Post('logout')
  logout(){
    return this.authService.signOut();
  }

}
