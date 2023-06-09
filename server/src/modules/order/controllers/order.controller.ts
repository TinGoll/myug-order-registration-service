import { Body, Controller, Post, Delete, Param, Get } from '@nestjs/common';
import OrderTypes from 'src/cammon/types/order-types';
import { OrderCreator } from '../providers/order-creator';

@Controller('api/orders')
export class OrderController {
  constructor(private readonly orderCreator: OrderCreator) {}

  @Post('save')
  saveOrder(@Body() input: OrderTypes.Order) {
    return this.orderCreator.saveOrder(input);
  }

  @Delete('remove/:id')
  removeOrder(@Param('id') id: string) {
    return this.orderCreator.removeOrder(Number(id));
  }

  @Delete('delete/:id')
  deleteOrder(@Param('id') id: string) {
    return this.orderCreator.deleteOrder(Number(id));
  }

  @Get()
  getOrders() {
    return this.orderCreator.getOrders();
  }
}
