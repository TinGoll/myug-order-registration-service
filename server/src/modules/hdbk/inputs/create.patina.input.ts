import OrderTypes from 'src/cammon/types/order-types';

export class CreatePatinaInput implements Omit<OrderTypes.Patina, 'id'> {
  name: string;
  type: string;
}
