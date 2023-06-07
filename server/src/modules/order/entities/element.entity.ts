import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import OrderTypes from '../../../cammon/types/order-types';
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

  @Column({ type: 'jsonb', default: null, nullable: true })
  nomenclature: OrderTypes.Nomenclature;

  @ManyToOne(() => OrderDocument, (document) => document.elements, {
    onDelete: 'CASCADE',
  })
  document: OrderTypes.Document;
}
