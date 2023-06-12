import OrderTypes from 'src/cammon/types/order-types';
import { Component, ComponentClass } from 'yug-entity-component-system';
import { GeometryComponent } from './components/geometry.component';
import { PriceComponent } from './components/price.component';

type CompomemtMap = {
  [key in OrderTypes.ComponentKey]: ComponentClass;
};

const componentMap: Readonly<CompomemtMap> = {
  geometry: GeometryComponent,
  price: PriceComponent,
} as const;

export class ComponentMapper {
  private static instance: ComponentMapper;
  private readonly map = new Map<OrderTypes.ComponentKey, ComponentClass>();

  constructor() {
    if (ComponentMapper.instance) {
      return ComponentMapper.instance;
    }
    ComponentMapper.instance = this;
    this.loadComponents();
  }

  private loadComponents() {
    for (const key in componentMap) {
      this.map.set(key as OrderTypes.ComponentKey, componentMap[key]);
    }
  }

  get<K extends OrderTypes.ComponentKey>(componentKey: K): ComponentClass {
    return this.map.get(componentKey);
  }

  getInstance<K extends OrderTypes.ComponentKey, J extends any[]>(
    componentKey: K,
    ...args: J
  ): Component {
    const Cmp = this.map.get(componentKey);
    if (!Cmp) return null;
    const cmp = new Cmp(...args);
    cmp.name = componentKey;
    return cmp;
  }
}
