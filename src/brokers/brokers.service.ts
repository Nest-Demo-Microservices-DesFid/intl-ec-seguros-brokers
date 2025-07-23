import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateBrokerDto } from './dto/create-broker.dto';
import { UpdateBrokerDto } from './dto/update-broker.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common';

@Injectable()
export class BrokersService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('BrokersService');
  onModuleInit() {
    this.$connect();
    this.logger.log('Database connected.');
  }
  create(createBrokerDto: CreateBrokerDto) {
    return this.broker.create({
      data: createBrokerDto
    })
  }

  async findAll(paginationDto: PaginationDto) {
    const {page, limit} = paginationDto;
    const totalCount = await this.broker.count();
    const lastPage = Math.ceil(totalCount/limit);
    return {
      data: await this.broker.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: {isActive: true}
    }),
    meta: {
      page,
      total: totalCount,
      lastPage
    }
    };
  }

  async findOne(id: number) {
    const brokerFound = await this.broker.findFirst({
      where: {id, isActive: true}
    })
    if (!brokerFound) {
      throw new NotFoundException(`Broker with id ${id} not found.`);
    }
    return brokerFound
  }
  async update(id: number, updateBrokerDto: UpdateBrokerDto) {
    const { id: __, ...data} = updateBrokerDto;
    await this.findOne(id);
    return this.broker.update({
      where: {id, isActive: true},
      data
    })
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.broker.update({
      where: {id},
      data: {
        isActive: false
      }
    })
  }
}
