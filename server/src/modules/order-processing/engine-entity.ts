import OrderTypes from 'src/cammon/types/order-types';
import { Entity } from 'yug-entity-component-system';

export class EngineEntity extends Entity {
  constructor(
    private readonly element: OrderTypes.Element,
    private readonly document: OrderTypes.Document,
    private readonly order: OrderTypes.Order,
  ) {
    super();
  }
}
