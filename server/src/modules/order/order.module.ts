import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './services/order.service';
import { OrderController } from './controllers/order.controller';
import { OrderGateway } from './gateway/order.gateway';
import { OrderDocument } from './entities/document.entity';
import { OrderElement } from './entities/element.entity';
import { Order } from './entities/order.entity';
import { DocumentService } from './services/document.service';
import { ElementService } from './services/element.service';
import { OrderCreator } from './providers/order-creator';
import { OrderProcessingModule } from '../order-processing/order-processing.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderDocument, OrderElement]),
    OrderProcessingModule,
  ],
  providers: [
    OrderService,
    OrderGateway,
    DocumentService,
    ElementService,
    OrderCreator,
  ],
  controllers: [OrderController],
  exports: [],
})
export class OrderModule {}
