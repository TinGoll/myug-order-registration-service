import $nanoid from "../../features/nanoid";
import OrderTypes from "../../types/order-types";

export class OrderElement implements Partial<OrderTypes.Element> {
  key: string;
  name: string;
  note: string = "";
  components: OrderTypes.Component<object>[];
  constructor(readonly nomenclature: OrderTypes.Nomenclature) {
    this.name = nomenclature.name;
    this.components = nomenclature.components;
    this.key = $nanoid();
  }
}
