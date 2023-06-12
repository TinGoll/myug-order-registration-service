import { Entity, Family, IteratingSystem } from 'yug-entity-component-system';
import { GeometryComponent } from '../components/geometry.component';
import { EngineEntity } from '../../engine-entity';

export class GeometrySystem extends IteratingSystem {
  constructor() {
    super(GeometrySystem, Family.one(GeometryComponent).get());
  }

  async beforeUpdate(): Promise<void> {}

  protected async processEntity(
    entity: EngineEntity,
    deltaTime: number,
  ): Promise<void> {
    const toFixed = 3;
    const mm = 1000;
    const cmpGeometry =
      entity.getComponent<GeometryComponent>(GeometryComponent)?.data;

    const height = Number(cmpGeometry.height || 0);
    const width = Number(cmpGeometry.width || 0);
    const depth = Number(cmpGeometry.depth || 0);
    const amount = Number(cmpGeometry.amount || 0);

    cmpGeometry.square = Number(
      ((height / mm) * (width / mm) * amount).toFixed(toFixed),
    );
    cmpGeometry.cubature = Number(
      ((height / mm) * (width / mm) * (depth / mm) * amount).toFixed(toFixed),
    );
    cmpGeometry.perimeter = Number(
      (((height / mm) * 2 + (width / mm) * 2) * amount).toFixed(toFixed),
    );
    cmpGeometry.linearMeters = Number(
      ((height / mm) * amount).toFixed(toFixed),
    );

    if (cmpGeometry.height !== null) {
      cmpGeometry.height = height;
    }
    if (cmpGeometry.width !== null) {
      cmpGeometry.width = width;
    }
    if (cmpGeometry.depth !== null) {
      cmpGeometry.depth = depth;
    }
    if (cmpGeometry.amount !== null) {
      cmpGeometry.amount = amount;
    }
  }
}
