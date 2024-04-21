import { Body, Controller, Get, Request, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { encodePassword } from '../utils/bcrypt';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './auth.guard';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Авторизация')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/auth')
  @ApiBody({ type: LoginDto })
  getHello(@Body() signInDto: LoginDto) {
    return this.authService.signIn(signInDto.login, signInDto.password)
  }

  @UseGuards(AuthGuard)
  @Get('/auth/profile')
  getProfile(@Request() req) {
    return req.user;
  }
}