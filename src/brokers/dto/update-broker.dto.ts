import { PartialType } from '@nestjs/mapped-types';
import { CreateBrokerDto } from './create-broker.dto';
import { IsNumber, IsPositive } from 'class-validator';

export class UpdateBrokerDto extends PartialType(CreateBrokerDto) {
  @IsNumber()
  @IsPositive()
  id: number;
}
