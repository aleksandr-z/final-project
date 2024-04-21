import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../user/user.model';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '../user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { config } from '../providers/config.provider';

@Module({
  imports: [SequelizeModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: config.get('SECRET'),
      signOptions: { expiresIn: '600s' },
    }),],
  providers: [AuthService, UsersService],
  controllers: [AuthController],
})
export class AuthModule {}