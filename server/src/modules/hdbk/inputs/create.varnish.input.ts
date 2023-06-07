import OrderTypes from 'src/cammon/types/order-types';

export class CreateVarnishInput implements Omit<OrderTypes.Varnish, 'id'> {
  name: string;
  type: string;
}
