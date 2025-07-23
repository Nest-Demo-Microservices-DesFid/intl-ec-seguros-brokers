import { Module } from '@nestjs/common';
import { BrokersModule } from './brokers/brokers.module';

@Module({
  imports: [BrokersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
