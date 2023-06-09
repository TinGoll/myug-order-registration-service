import { Injectable } from '@nestjs/common';
import OrderTypes from 'src/cammon/types/order-types';

@Injectable()
export class OrderProcessing {
  once(order: OrderTypes.Order): OrderTypes.Order {
    return order;
  }
}
