import {
  Body,
  Controller,
  Post,
  Delete,
  Param,
  Get,
  HttpCode,
  Req,
  UseGuards,
} from '@nestjs/common';
import OrderTypes from 'src/cammon/types/order-types';
import { OrderCreator } from '../providers/order-creator';
import { OrderState } from '../enums/order-state.enum';
import { Person } from 'src/cammon/types/app-types';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';

@Controller('api/orders')
export class OrderController {
  constructor(private readonly orderCreator: OrderCreator) {}

  @Post('processing')
  @HttpCode(200)
  orderProcessing(@Body() input: OrderTypes.Order) {
    return this.orderCreator.once(input);
  }

  @UseGuards(JwtAuthGuard)
  @Post('state/:id')
  @HttpCode(200)
  setState(
    @Param('id') id: string,
    @Body() { state }: { state: OrderState },
    @Req() request: { user: Person },
  ) {
    return this.orderCreator.setState(Number(id), state, request.user);
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
