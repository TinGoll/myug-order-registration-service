import OrderTypes from 'src/cammon/types/order-types';
import { Entity } from 'yug-entity-component-system';

export class EngineEntity extends Entity {
  constructor(
    public readonly element: OrderTypes.Element,
    public readonly document: OrderTypes.Document,
    public readonly order: OrderTypes.Order,
  ) {
    super();
  }
}
