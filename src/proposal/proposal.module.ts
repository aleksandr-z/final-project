import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProposalController } from './proposal.controller';
import { ProposalService } from './proposal.service';
import { Proposal } from './proposal.model';
import { AutoCategory } from '../dict/categories.model';
import { Dictionary } from '../dict/dict.model';
import { User } from '../user/user.model';

@Module({
  imports: [SequelizeModule.forFeature([Proposal, AutoCategory, Dictionary, User])],
  providers: [ProposalService],
  controllers: [ProposalController],
})
export class ProposalModule {}