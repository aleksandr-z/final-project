import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { Request } from 'express';
import { config } from '../providers/config.provider';
import { JwtService } from '@nestjs/jwt';
import { encodePassword } from '../utils/bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async findMe(request: Request){
    try {
      const token = this.extractTokenFromHeader(request);
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: config.get('SECRET')
        }
      );
      const res = await this.findOne(payload.username);
      return {
        id: res.id,
        login: res.login,
        isActive: res.isActive,
      };
    } catch {
      throw new UnauthorizedException();
    }
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  findOne(login: string): Promise<User> {
    return this.userModel.findOne({
      where: {
        login,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }


  async createUser(login: string, password: string, request: Request){
    const token = this.extractTokenFromHeader(request);
    let payload;
    try {
      payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: config.get('SECRET')
        }
      );
    } catch {
      throw new UnauthorizedException();
    }
    if(payload.username === 'zvyagin'){
      const pass = await encodePassword(password);
      const user = new User({
        login,
        password: pass,
        isActive: 1
      });
      return user.save();
    } else {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }
}