import { AllowNull, AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { AUTO_CATEGORIES, DICT_LIST, Dictionary } from './dict.model';

@Table
export class AutoCategory extends Model {
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

  @HasMany(() => Dictionary)
  dict: Dictionary[]
}