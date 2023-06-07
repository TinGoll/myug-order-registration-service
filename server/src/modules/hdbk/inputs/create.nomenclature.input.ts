import OrderTypes from 'src/cammon/types/order-types';

export class CreateNomenclatureInput
  implements Omit<OrderTypes.Nomenclature, 'id' | 'deleted'>
{
  name: string;
  group: string;
  components: OrderTypes.Component<object>[];
  orderBy: number;
  typeOf?: string[];
}
