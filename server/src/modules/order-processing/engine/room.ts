import OrderTypes from 'src/cammon/types/order-types';
import { Component, Engine } from 'yug-entity-component-system';
import { EngineEntity } from '../engine-entity';
import { EngineData, defaultEngineData } from './engine-data';
import { ComponentMapper } from './component-mapper';
import { GeometrySystem } from './systems/geometry.system';
import { PriceSystem } from './systems/price.system';
import { Observable, from } from 'rxjs';

export class Room {
  public readonly key: number;

  private readonly engine: Engine<EngineEntity, EngineData>;
  private readonly componentMapper: ComponentMapper;

  constructor(private readonly order: OrderTypes.Order) {
    this.key = order.id;
    this.engine = new Engine<EngineEntity, EngineData>(defaultEngineData);
    this.componentMapper = new ComponentMapper();
    this.afterCreation();
  }

  update(): Observable<void> {
    return from(this.engine.update(0));
  }

  build(): OrderTypes.Order {
    const entities = this.engine.getEntities();
    for (const entity of entities) {
      for (const component of entity.element.components) {
        const cmp = entity.getComponent<any>(
          this.componentMapper.get(component.name),
        );
        if (cmp && cmp.data) {
          component.data = cmp.data;
        }
      }
    }
    return this.order;
  }

  dispouse() {}

  private afterCreation(): void {
    // Определяем системы.
    this.engine.addSystem(new GeometrySystem());
    this.engine.addSystem(new PriceSystem());
    // Загружаем сущности.
    const documents = this.order.documents || [];
    for (const document of documents) {
      const elements = document.elements || [];
      for (const element of elements) {
        this.loadEntity(element, document, this.order);
      }
    }
  }

  private loadEntity(
    element: OrderTypes.Element,
    document: OrderTypes.Document,
    order: OrderTypes.Order,
  ) {
    const entity = new EngineEntity(element, document, order);
    for (const cmp of element.components) {
      const component = this.componentInstance(cmp);
      if (component) {
        entity.add(component);
      }
    }
    this.engine.addEntity(entity);
  }

  private componentInstance(elementComponent: OrderTypes.Component): Component {
    return this.componentMapper.getInstance(
      elementComponent.name,
      elementComponent.data,
    );
  }
}
