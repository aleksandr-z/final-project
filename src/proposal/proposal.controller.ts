import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Put, Param, Post, Request, UseGuards, Delete } from '@nestjs/common';
import { ProposalService } from './proposal.service';
import { AuthGuard } from '../auth/auth.guard';
import { ProposalDto, STATUS_CODES } from './dto/proposal.dto';
import { DataType } from 'sequelize-typescript';

@ApiBearerAuth('access-token')
@ApiTags('Заявки')
@Controller()
export class ProposalController {
  constructor(private readonly proposalService: ProposalService) {
  }

  @ApiOperation({
    description: 'Получение статуса заявки'
  })
  @ApiParam({ name: 'proposalId' })
  @ApiResponse({ status: 200, type: DataType.STRING })
  @ApiResponse({ status: 401, description: 'Unauthorized.'})
  @UseGuards(AuthGuard)
  @Get('/proposal/:proposalId/status')
  getStatus(@Param('proposalId') proposalId: number, @Request() request){
    return this.proposalService.getStatus(proposalId, request)
  }

  @ApiOperation({
    description: 'Удаление заявки'
  })
  @ApiParam({ name: 'proposalId' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 401, description: 'Unauthorized.'})
  @UseGuards(AuthGuard)
  @Delete('/proposal/:proposalId')
  deleteProposal(@Param('proposalId') proposalId: number, @Request() request){
    return this.proposalService.deleteProposal(proposalId, request)
  }


  @ApiOperation({
    description: 'Отправка заявки на рассмотрение (перевод в статус PENDING)'
  })
  @ApiParam({ name: 'proposalId' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 401, description: 'Unauthorized.'})
  @UseGuards(AuthGuard)
  @Get('/proposal/:proposalId/send')
  send(@Param('proposalId') proposalId: number, @Request() request){
    return this.proposalService.send(proposalId, request)
  }

  @ApiOperation({
    description: 'Получение заявки по идентификатору'
  })
  @ApiParam({ name: 'proposalId' })
  @ApiResponse({ status: 200, type: ProposalDto})
  @ApiResponse({ status: 401, description: 'Unauthorized.'})
  @UseGuards(AuthGuard)
  @Get('/proposal/:proposalId')
  getProposal(@Param('proposalId') proposalId: number, @Request() request) {
    return this.proposalService.getProposal(proposalId, request)
  }

  @ApiOperation({
    description: 'Создание заявки'
  })
  @ApiBody({
    type: ProposalDto
  })
  @ApiResponse({ status: 200, type: ProposalDto})
  @ApiResponse({ status: 401, description: 'Unauthorized.'})
  @UseGuards(AuthGuard)
  @Post('/proposal')
  saveProposal(@Body() proposalDto: ProposalDto, @Request() request){
    return this.proposalService.saveProposal(proposalDto, request);
  }

  @ApiOperation({
    description: 'Обновление заявки'
  })
  @ApiBody({
    type: ProposalDto
  })
  @ApiResponse({ status: 200, type: ProposalDto})
  @ApiResponse({ status: 401, description: 'Unauthorized.'})
  @UseGuards(AuthGuard)
  @Put('/proposal')
  update(@Body() proposalDto: ProposalDto, @Request() request){
    return this.proposalService.update(proposalDto, request);
  }

  @ApiOperation({
    description: 'Получение списка заявок'
  })
  @ApiResponse({ status: 200, type: [ProposalDto]})
  @ApiResponse({ status: 401, description: 'Unauthorized.'})
  @UseGuards(AuthGuard)
  @Get('/proposals')
  getList(@Request() request){
    return this.proposalService.getList(request);
  }

}