import { Module } from '@nestjs/common';
import { OrderProcessing } from './order-processing';

@Module({
  providers: [OrderProcessing],
  exports: [OrderProcessing],
})
export class OrderProcessingModule {}
