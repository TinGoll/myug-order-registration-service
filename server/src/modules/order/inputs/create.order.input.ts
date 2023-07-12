import OrderTypes from 'src/cammon/types/order-types';

export class CreateOrderInput implements OrderTypes.CreateOrderInput {
  clientNumner?: string;
  id?: number;
  itmId?: number;
  note?: string;
  author?: OrderTypes.Author;
  client?: OrderTypes.Client;
  manager?: OrderTypes.Manager;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  status?: string;
  result?: object;
  documents?: OrderTypes.Document[];
  deleted?: boolean;
}
