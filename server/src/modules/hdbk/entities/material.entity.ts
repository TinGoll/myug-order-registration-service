import OrderTypes from 'src/cammon/types/order-types';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('materials')
export class Material implements OrderTypes.Material {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 32, nullable: false })
  name: string;
  @Column({ type: 'varchar', length: 32 })
  type: OrderTypes.MaterialType;
}
