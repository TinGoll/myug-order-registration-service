import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import OrderTypes from '../types/order-types';

@Entity('nomenclatures')
export class Nomenclature implements OrderTypes.Nomenclature {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', nullable: true })
  name: string;
  @Column({ type: 'varchar', nullable: true })
  group: string;
  @Column({ type: 'jsonb', default: [] })
  components: OrderTypes.Component<object>[];
  @Column({ type: 'integer', default: 0 })
  orderBy: number;
  @Column({ type: 'jsonb', default: [] })
  typeOf?: string[];
  @Column({ type: 'boolean', default: false })
  deleted: boolean;
}
