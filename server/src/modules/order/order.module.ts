import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './services/order.service';
import { OrderController } from './controllers/order.controller';
import { OrderGateway } from './gateway/order.gateway';
import { OrderDocument } from './entities/document.entity';
import { OrderElement } from './entities/element.entity';
import { Nomenclature } from './entities/nomenclature.entity';
import { Order } from './entities/order.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Order,
      OrderDocument,
      OrderElement,
      Nomenclature,
    ]),
  ],
  providers: [OrderService, OrderGateway],
  controllers: [OrderController],
})
export class OrderModule {}
