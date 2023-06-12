import OrderTypes from 'src/cammon/types/order-types';
import { Component } from 'yug-entity-component-system';

const defaultData: OrderTypes.Geometry = {
  height: 0,
  width: 0,
  depth: 0,
  amount: 0,
  square: 0,
  cubature: 0,
  perimeter: 0,
  linearMeters: 0,
};

export class GeometryComponent
  extends Component
  implements OrderTypes.Component<OrderTypes.Geometry>
{
  data: OrderTypes.Geometry;
  name: OrderTypes.ComponentKey;
  constructor(data: Partial<OrderTypes.Geometry> = {}) {
    super(GeometryComponent);
    this.data = { ...defaultData, ...data };
  }
}
