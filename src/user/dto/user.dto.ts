import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  login: string;
  @ApiProperty()
  isActive: boolean;
}