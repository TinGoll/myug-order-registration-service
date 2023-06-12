import OrderTypes from 'src/cammon/types/order-types';
import { Component } from 'yug-entity-component-system';

const defaultData: OrderTypes.Price = {
  price: 0,
  value: 0,
  unit: 'шт.',
};

export class PriceComponent
  extends Component
  implements OrderTypes.Component<OrderTypes.Price>
{
  data: OrderTypes.Price;
  name: OrderTypes.ComponentKey;
  constructor(data: Partial<OrderTypes.Price> = {}) {
    super(PriceComponent);
    this.data = { ...defaultData, ...data };
  }
}
