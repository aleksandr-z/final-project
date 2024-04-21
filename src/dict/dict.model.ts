import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { AutoCategory } from './categories.model';

export enum DICT_LIST {
  AUTO = 'AUTO',
  CITIES = 'CITIES',
  STATUSES = 'STATUSES'
}

export enum DICTIONARY_CATEGORIES {
  AUTO_CATEGORIES = 'AUTO_CATEGORIES'
}

export type DICT_LIST_TYPE = DICT_LIST | DICTIONARY_CATEGORIES;
export const dictList = {
  ...DICT_LIST,
  ...DICTIONARY_CATEGORIES
}

export enum AUTO_CATEGORIES {
  LADA = 'LADA',
  VOLKSWAGEN = 'VOLKSWAGEN',
  RENAULT = 'RENAULT',
  SKODA = 'SKODA'
}

@Table
export class Dictionary extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @AllowNull(false)
  @Column
  name: string;

  @AllowNull(false)
  @Column
  code: string;

  @AllowNull(false)
  @Column({
    type: DataType.ENUM(...Object.values(DICT_LIST)),
  })
  dictCode!: DICT_LIST;

  @BelongsTo(() => AutoCategory)
  category: AutoCategory;


  @AllowNull(true)
  @ForeignKey(() => AutoCategory)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  categoryId: string;
}