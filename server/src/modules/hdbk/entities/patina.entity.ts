import OrderTypes from 'src/cammon/types/order-types';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('patinas')
export class Patina implements OrderTypes.Patina {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 128, nullable: false })
  name: string;
  @Column({ type: 'varchar', length: 32 })
  type: string;
}
