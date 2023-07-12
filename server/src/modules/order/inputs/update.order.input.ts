import OrderTypes from 'src/cammon/types/order-types';

export class UpdateOrderInput implements OrderTypes.UpdateOrderInput {
  id: number;
  itmId?: number;
  note?: string;
  clientNumner?: string;
  author?: OrderTypes.Author;
  client?: OrderTypes.Client;
  manager?: OrderTypes.Manager;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  status?: string;
  result?: object;
  deleted?: boolean;
}
