import $nanoid from "../../features/nanoid";
import OrderTypes from "../../types/order-types";

export class Order implements Partial<OrderTypes.Order> {
  key: string;
  itmId: number | null = null;
  clientNumner: string = "";
  note: string | null = null;
  author: OrderTypes.Author | null = null;
  client: OrderTypes.Client | null = null;
  manager: OrderTypes.Manager | null = null;
  result: object = {};
  documents: OrderTypes.Document[] = [];
  deleted: boolean = false;
  constructor(author: OrderTypes.Author) {
    this.author = author;
    this.client = author;
    this.key = $nanoid();
  }
}
