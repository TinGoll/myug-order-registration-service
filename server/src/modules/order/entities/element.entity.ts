import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import OrderTypes from '../types/order-types';
import { Nomenclature } from './nomenclature.entity';
import { OrderDocument } from './document.entity';

@Entity('elements')
export class OrderElement implements OrderTypes.Element {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', nullable: true })
  name: string;
  @Column({ type: 'varchar', nullable: true })
  note: string;
  @Column({ type: 'jsonb', default: [] })
  components: OrderTypes.Component<object>[];

  @ManyToOne((nomenclature) => Nomenclature, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'nomenclatureId' })
  nomenclature: OrderTypes.Nomenclature;
  @ManyToOne(() => OrderDocument, (document) => document.elements, {
    onDelete: 'CASCADE',
  })
  document: OrderTypes.Document;
}
