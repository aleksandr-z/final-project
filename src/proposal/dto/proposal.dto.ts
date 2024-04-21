import { ApiProperty } from '@nestjs/swagger';

export class DictionaryType<CODE extends string> {
  @ApiProperty()
  code: CODE;
}

export enum STATUS_CODES {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  REJECTED = 'REJECTED'
}

export class PersonType {
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  driverLicense: string;
  @ApiProperty()
  email: string;
}

export class AutoType {
  @ApiProperty()
  autoCategory: DictionaryType<string>;
  @ApiProperty()
  model: DictionaryType<string>;
}

export class ProposalDto {
  @ApiProperty()
  id: number;

  // @ApiProperty()
  // userId: number;

  @ApiProperty({
    type: DictionaryType<STATUS_CODES>
  })
  status: DictionaryType<STATUS_CODES>

  @ApiProperty({
    type: PersonType
  })
  person: PersonType;

  @ApiProperty({
    type: AutoType
  })
  auto: AutoType;

  @ApiProperty({
    type: DictionaryType<string>
  })
  city: DictionaryType<string>;
}