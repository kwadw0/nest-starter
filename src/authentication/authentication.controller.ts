import { Controller, Get, Post, Body, Request, UseGuards } from '@nestjs/common';
import { SignUpDto, } from './dto/signup.dto';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './authentication.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginDto } from './dto/login.dto';
import { ApiKeyGuard } from './guards/api-key.guard';

@Controller('authentication')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthService,
  ) { }


  @UseGuards(LocalAuthGuard)
  @Post('login')
  async userLogin(@Body() loginDto: LoginDto, @Request() req) {
    console.log(req.user);
      return await this.authService.login(req.user);
  }

  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto): Promise<User> {
      console.log(signUpDto);
      return await this.authService.signUp(signUpDto);
  }
}
