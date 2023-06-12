import { Entity, Family, IteratingSystem } from 'yug-entity-component-system';
import { PriceComponent } from '../components/price.component';

export class PriceSystem extends IteratingSystem {
  constructor() {
    super(PriceSystem, Family.one(PriceComponent).get());
  }

  async beforeUpdate(): Promise<void> {}

  protected async processEntity(
    entity: Entity,
    deltaTime: number,
  ): Promise<void> {}
}
