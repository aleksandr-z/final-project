import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Dictionary } from './dict.model';
import { DictController } from './dict.controller';
import { DictService } from './dict.service';
import { AutoCategory } from './categories.model';

@Module({
  imports: [SequelizeModule.forFeature([Dictionary, AutoCategory])],
  providers: [DictService],
  controllers: [DictController],
})
export class DictModule {}