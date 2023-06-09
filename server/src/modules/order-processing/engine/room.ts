import OrderTypes from 'src/cammon/types/order-types';
import { Component, Engine } from 'yug-entity-component-system';
import { EngineEntity } from '../engine-entity';
import { EngineData, defaultEngineData } from './engine-data';

export class Room {
  public readonly key: number;

  private readonly engine: Engine<EngineEntity, EngineData>;

  constructor(private readonly order: OrderTypes.Order) {
    this.key = order.id;
    this.engine = new Engine<EngineEntity, EngineData>(defaultEngineData);
    this.afterCreation();
  }

  private afterCreation(): void {
    // Определяем системы.
    // Загружаем сущности.
    const documents = this.order.documents || [];
    for (const document of documents) {
      const elements = document.elements || [];
      for (const element of elements) {
        this.loadEntities(element, document, this.order);
      }
    }
  }

  private loadEntities(
    element: OrderTypes.Element,
    document: OrderTypes.Document,
    order: OrderTypes.Order,
  ) {
    const entity = new EngineEntity(element, document, order);
  }

  private componentInstance(
    elementComponent: OrderTypes.Component,
  ): Component {}
}
