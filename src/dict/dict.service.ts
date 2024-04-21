import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { DICT_LIST_TYPE, Dictionary, DICTIONARY_CATEGORIES, dictList } from './dict.model';
import { AutoCategory } from './categories.model';

@Injectable()
export class DictService {
  constructor(
    @InjectModel(Dictionary)
    private dictModel: typeof Dictionary,
    @InjectModel(AutoCategory)
    private catModel: typeof AutoCategory,
  ) {}

  async findAll(): Promise<Dictionary[]> {
    return this.dictModel.findAll();
  }

  async getDictionary(dictCode: DICT_LIST_TYPE){
    if(!Object.values(dictList).includes(dictCode)){
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    if(dictCode == DICTIONARY_CATEGORIES.AUTO_CATEGORIES){
      return this.catModel.findAll();
    }
    return this.dictModel.findAll({
      where: {
        dictCode
      }
    });
  }

  findOne(login: string): Promise<Dictionary> {
    return this.dictModel.findOne({
      where: {
        login,
      },
    });
  }
}