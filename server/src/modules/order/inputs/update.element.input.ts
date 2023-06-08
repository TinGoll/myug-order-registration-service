import OrderTypes from 'src/cammon/types/order-types';

export class UpdateElementInput implements OrderTypes.UpdateElementInput {
  id: number;
  name?: string;
  note?: string;
  nomenclature?: OrderTypes.Nomenclature;
  components?: OrderTypes.Component<object>[];
}
