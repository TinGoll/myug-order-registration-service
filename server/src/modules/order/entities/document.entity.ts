import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import OrderTypes from '../../../cammon/types/order-types';
import { OrderElement } from './element.entity';
import { Order } from './order.entity';

@Entity('documents')
export class OrderDocument implements OrderTypes.Document {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', nullable: true })
  documentType?: string;
  @Column({ type: 'jsonb', default: null })
  material?: OrderTypes.Material;
  @Column({ type: 'jsonb', default: null })
  facadeModel?: OrderTypes.FacadeModel;
  @Column({ type: 'jsonb', default: null })
  panelModel?: OrderTypes.PanelModel;
  @Column({ type: 'jsonb', default: null })
  panelMaterial?: OrderTypes.Material;
  @Column({ type: 'jsonb', default: null })
  color?: OrderTypes.Color;
  @Column({ type: 'jsonb', default: null })
  varnish?: OrderTypes.Varnish;
  @Column({ type: 'jsonb', default: null })
  patina?: OrderTypes.Patina;
  @Column({ type: 'boolean', default: false })
  thermalseam?: boolean;
  @Column({ type: 'boolean', default: false })
  drill?: boolean;
  @Column({ type: 'varchar', nullable: true })
  texture?: OrderTypes.Textute;
  @Column({ type: 'varchar', nullable: true, length: 256 })
  note?: string;
  @CreateDateColumn()
  createdAt: string | Date;
  @UpdateDateColumn()
  updatedAt: string | Date;
  @Column({ type: 'boolean', default: false })
  deleted: boolean;
  @Column({ type: 'jsonb', default: {} })
  result: object;
  @OneToMany(() => OrderElement, (element) => element.document)
  elements?: OrderTypes.Element[];
  @ManyToOne(() => Order, (order) => order.documents, {
    onDelete: 'CASCADE',
  })
  order: OrderTypes.Order;
}
