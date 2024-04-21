import { dictList, DICT_LIST_TYPE } from '../dict.model';
import { ApiProperty } from '@nestjs/swagger';
import { IsLowercase } from 'sequelize-typescript';

export class DictionaryDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  code: string;
  @ApiProperty({
    enum: dictList
  })
  dictCode: DICT_LIST_TYPE;
  @ApiProperty({
    required: false,
  })
  categoryId?: number;
  @ApiProperty({
    type: Date,
    required: false,
  })
  createdAt: string;
  @ApiProperty({
    type: Date,
    required: false,
  })
  updatedAt: string;
}