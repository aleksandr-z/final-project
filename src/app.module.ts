import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user/user.model';
import { UsersModule } from './user/user.module';
import { encodePassword } from './utils/bcrypt';
import { AuthModule } from './auth/auth.module';
import { DictModule } from './dict/dict.module';
import { config } from './providers/config.provider';
import { ProposalModule } from './proposal/proposal.module';


@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: config.get('DB_HOST'),
      port: 3306,
      username: config.get('DB_USER'),
      password: config.get('DB_PASSWORD'),
      database: config.get('DB_NAME'),
      autoLoadModels: true,
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    DictModule,
    ProposalModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
