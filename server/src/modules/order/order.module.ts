import { Module } from '@nestjs/common';
import { OrderService } from './services/order.service';
import { OrderController } from './controllers/order.controller';
import { OrderGateway } from './gateway/order/order.gateway';

@Module({
  providers: [OrderService, OrderGateway],
  controllers: [OrderController]
})
export class OrderModule {}
