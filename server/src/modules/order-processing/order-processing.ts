import { Injectable } from '@nestjs/common';
import OrderTypes from 'src/cammon/types/order-types';
import { Observable, map, tap } from 'rxjs';
import { Room } from './engine/room';
import { OrderState } from '../order/enums/order-state.enum';

@Injectable()
export class OrderProcessing {
  /** Одноразовая обработка заказа с помощью движка */
  once(order: OrderTypes.Order): Observable<OrderTypes.Order> {
    order.state = OrderState.UNDER_VERIFICATION; // Установка состояния "На проверку"
    const room = new Room(order);
    return room.update().pipe(
      map(() => room.build()),
      tap(() => room.dispouse()),
    );
  }
}
