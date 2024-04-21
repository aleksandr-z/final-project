import { Body, Controller, Get, Headers, Post, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './user.service';
import { encodePassword } from '../utils/bcrypt';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { UserDto } from './dto/user.dto';
import { Request as ExRequest } from 'express';
import { LoginDto } from '../auth/dto/login.dto';

@ApiBearerAuth('access-token')
@ApiTags('Пользователи')
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    description: 'Получение текущего пользователя'
  })
  @ApiResponse({ status: 200, type: UserDto})
  @ApiResponse({ status: 401, description: 'Unauthorized.'})
  @UseGuards(AuthGuard)
  @Get('/user')
  getHello(@Request() headers: ExRequest) {
    return this.usersService.findMe(headers)
  }


  @Post('/user')
  createUser(@Body() user: LoginDto, @Request() request){
    return this.usersService.createUser(user.login, user.password, request);
  }
}