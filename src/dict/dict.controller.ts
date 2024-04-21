import { Controller, Get, Param, Query, Type, UseGuards } from '@nestjs/common';
import { DictService } from './dict.service';
import { encodePassword } from '../utils/bcrypt';
import { AuthGuard } from '../auth/auth.guard';
import { DICT_LIST, DICT_LIST_TYPE, Dictionary, dictList } from './dict.model';
import {
  ApiBasicAuth, ApiBearerAuth,
  ApiCreatedResponse, ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { Schema } from 'inspector';
import { DictionaryDto } from './dto/dictionary.dto';

@ApiBearerAuth('access-token')
@ApiTags('Справочники')
@Controller()
export class DictController {
  constructor(private readonly dictService: DictService) {}

  @ApiOperation({
    description: 'Получение справочника по коду'
  })
  @ApiParam({ name: 'dictCode', enum: Object.values(dictList) })
  @ApiResponse({ status: 200, type: DictionaryDto})
  @ApiResponse({ status: 401, description: 'Unauthorized.'})
  @UseGuards(AuthGuard)
  @Get('/dictionary/:dictCode')
  getDictionary(@Param('dictCode') dictCode: DICT_LIST_TYPE) {
    return this.dictService.getDictionary(dictCode);
  }
}