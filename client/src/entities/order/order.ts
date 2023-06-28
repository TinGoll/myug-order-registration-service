import OrderTypes from "../../types/order-types";

export class Order implements Partial<OrderTypes.Order> {
  itmId: number | null = null;
  clientNumner: string = "";
  author: OrderTypes.Author | null = null;
  client: OrderTypes.Client | null = null;
  manager: OrderTypes.Manager | null = null;
  result: object = {};
  documents: OrderTypes.Document[] = [];
  deleted: boolean = false;
  constructor() {}
}
