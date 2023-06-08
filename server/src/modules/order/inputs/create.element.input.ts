import OrderTypes from 'src/cammon/types/order-types';

export class CreateElementInput implements Partial<OrderTypes.Nomenclature> {
  id: number;
  name: string;
  group: string;
  components: OrderTypes.Component<object>[];
  orderBy: number;
  typeOf?: string[];
}
