import OrderTypes from 'src/cammon/types/order-types';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('varnishes')
export class Varnish implements OrderTypes.Varnish {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 128, nullable: true })
  name: string;
  @Column({ type: 'varchar', length: 32 })
  type: string;
}
