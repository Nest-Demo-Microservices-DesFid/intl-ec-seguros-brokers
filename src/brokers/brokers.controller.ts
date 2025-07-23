import { Controller, ParseIntPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaginationDto } from 'src/common';
import { BrokersService } from './brokers.service';
import { CreateBrokerDto } from './dto/create-broker.dto';
import { UpdateBrokerDto } from './dto/update-broker.dto';

@Controller('brokers')
export class BrokersController {
  constructor(private readonly brokersService: BrokersService) {}

  // @Post()
  @MessagePattern({cmd: 'create_broker'})
  create(@Payload() createBrokerDto: CreateBrokerDto) {
    return this.brokersService.create(createBrokerDto);
  }

  // @Get()
  @MessagePattern({cmd: 'find_all_brokers'})
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.brokersService.findAll(paginationDto);
  }

  // @Get(':id')
  @MessagePattern({cmd: 'find_one_broker'})
  findBrokerById(@Payload('id', ParseIntPipe) id: number) {
    return this.brokersService.findOne(id);
  }

  // @Patch(':id')
  @MessagePattern({cmd: 'update_broker'})
  patchBroker(@Payload() updateBrokerDto: UpdateBrokerDto) {
    return this.brokersService.update(updateBrokerDto.id, updateBrokerDto);
  }

  // @Delete(':id')
  @MessagePattern({cmd: 'delete_broker'})
  remove(@Payload('id', ParseIntPipe) id: number) {
    return this.brokersService.remove(id);
  }
}
