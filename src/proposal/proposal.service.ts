import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Proposal } from './proposal.model';
import { ProposalDto, STATUS_CODES } from './dto/proposal.dto';
import { User } from '../user/user.model';
import { AutoCategory } from '../dict/categories.model';
import { Dictionary } from '../dict/dict.model';
import { Request } from 'express';
import { config } from '../providers/config.provider';
import { JwtService } from '@nestjs/jwt';
import { randomMinute } from '../utils/random';
import { setTimeout } from 'timers';

@Injectable()
export class ProposalService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(Proposal)
    private proposalModel: typeof Proposal,
    @InjectModel(Dictionary)
    private dictModel: typeof Dictionary,
    @InjectModel(AutoCategory)
    private catModel: typeof AutoCategory,
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async send(proposalId: number, request: Request){
    const res = await this.changeStatus(proposalId, request, STATUS_CODES.PENDING);
    try {
      if(res){
        const t = randomMinute(1, 3);
        setTimeout(() => {
          const status = Math.random() < 0.4 ? STATUS_CODES.REJECTED : STATUS_CODES.SUCCESS;
          this.changeStatus(proposalId, request, status, true);
        }, t)
      }
    } catch {
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return;
  }

  async getStatus(proposalId: number, request: Request){
    const user = await this.getUser(request);
    console.log(user);
    const proposalDB = await this.proposalModel.findOne({
      where: {
        id: proposalId,
        userId: user.id
      }
    });
    if(!proposalDB){
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return proposalDB.status;
  }

  async getList(request: Request){
    const user = await this.getUser(request);
    const proposalsDB = await this.proposalModel.findAll({
      where: {
        userId: user.id
      }
    });

    const results = [];
    for(let proposal of proposalsDB){
      results.push(await this.mapToDto(proposal));
    }

    return results;
  }

  async deleteProposal(proposalId: number, request: Request){
    const user = await this.getUser(request);
    const proposalDB = await this.proposalModel.findOne({
      where: {
        id: proposalId,
        userId: user.id
      }
    });
    if(!proposalDB){
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
    await this.proposalModel.destroy({
      where: {
        id: proposalId,
        userId: user.id
      }
    })
    return;
  }

  async getProposal(proposalId: number, request: Request){
    const user = await this.getUser(request);
    const proposalDB = await this.proposalModel.findOne({
      where: {
        id: proposalId,
        userId: user.id
      }
    });
    if(!proposalDB){
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return this.mapToDto(proposalDB);
  }

  async saveProposal(proposal: ProposalDto, request: Request){
    const proposalInstance = await this.mapToDB(proposal, request);
    return proposalInstance.save();
  }


  async update(proposal: ProposalDto, request: Request){
    if(!proposal.id){
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
    const user = await this.getUser(request);
    const proposalDB = await this.proposalModel.findOne({
      where: {
        id: proposal.id,
        userId: user.id
      }
    });
    if(!proposalDB){
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

      const proposalInstance = await this.mapToDB(proposal, request);
      const { status, ...props } = proposalInstance.dataValues;
      const rrr = await this.proposalModel.update(props, {
        where: { id: proposal.id },
        returning: true,
      });

    const updatedProposal = await this.proposalModel.findOne({
      where: {
        id: proposal.id,
      }
    });

    return this.mapToDto(updatedProposal);

  }

  private async mapToDB(productDto: ProposalDto, request: Request) {
      const { firstName, lastName, driverLicense, email } = productDto.person;
      const autoCategory = await this.catModel.findOne({
        where: {
          code: productDto.auto.autoCategory.code,
        }
      });
      const user = await this.getUser(request);
      return new Proposal({
        id: productDto.id,
        userId: user.id,
        status: productDto.status.code,
        firstName,
        lastName,
        driverLicense,
        email,
        model: productDto.auto.model.code,
        city: productDto.city.code,
        autoCategoryId: autoCategory.id
      })
  }

  // async update(id: number, productData) {
  //   const [affectedCount, affectedRows] = await this.proposalModel.update(productData, {
  //     where: { id },
  //     returning: true,
  //
  //   });
  //   console.log('affectedCount, affectedRows', affectedCount, affectedRows);
  //   return [affectedCount, affectedRows as Proposal[]];
  // }


  private async mapToDto(proposalDB: Proposal){
      const autoCategoryRecord = await this.catModel.findOne({
        where: {
          id: proposalDB.autoCategoryId
        }
      });
      return {
        id: proposalDB.id,
        auto: {
          model: {
            code: proposalDB.model
          },
          autoCategory: {
            code:autoCategoryRecord.code
          }
        },
        city: {
          code: proposalDB.city
        },
        status: {
          code: proposalDB.status
        },
        person: {
          firstName: proposalDB.firstName,
          lastName: proposalDB.lastName,
          driverLicense: proposalDB.driverLicense,
          email: proposalDB.email
        }
      } as ProposalDto
  }

  private async getUser(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    try {
      const payload = this.jwtService.decode(
        token
      );
      const user = await this.userModel.findOne({
        where: {
          login: payload.username
        }
      });
      return user;
    } catch {
      throw new UnauthorizedException();
    }
  }

  private async changeStatus(proposalId: number, request: Request, status: STATUS_CODES, canChangeStatus = false){
    const user = await this.getUser(request);

    const proposalDB = await this.proposalModel.findOne({
      where: {
        id: proposalId,
        userId: user.id
      }
    });

    if(!proposalDB){
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }


    if(!canChangeStatus && proposalDB.status !== STATUS_CODES.DRAFT){
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }

    const result = await this.proposalModel.update({
      status,
    }, {
      where: { id: proposalId },
      returning: true,
    });

    return true;
  }

}