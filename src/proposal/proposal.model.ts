import {
  AllowNull,
  AutoIncrement, BelongsTo,
  Column,
  DataType, ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from '../user/user.model';
import { AutoCategory } from '../dict/categories.model';

@Table
export class Proposal extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;


  @BelongsTo(() => User)
  user: User;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @AllowNull(false)
  @Column({
      type: DataType.STRING,
  })
  status: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING
  })
  firstName: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING
  })
  lastName: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING
  })
  driverLicense: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING
  })
  email: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING
  })
  model: string;

  @BelongsTo(() => AutoCategory)
  autoCategory: AutoCategory;

  @AllowNull(false)
  @ForeignKey(() => AutoCategory)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  autoCategoryId: number;

  @AllowNull(false)
  @Column({
    type: DataType.STRING
  })
  city: string;
}