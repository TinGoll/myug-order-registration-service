import OrderTypes from 'src/cammon/types/order-types';

export class UpdatePatinaInput implements Partial<OrderTypes.Patina> {
  id: number;
  name?: string;
  type?: string;
}
