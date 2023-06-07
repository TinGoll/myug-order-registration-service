import OrderTypes from 'src/cammon/types/order-types';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('models')
export class Model implements OrderTypes.FacadeModel {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 30, nullable: false })
  name: string;
  @Column({ type: 'varchar', length: 10 })
  assemblyAngle: OrderTypes.AssemblyAngle;
  @Column({ type: 'jsonb', default: [] })
  profileWidth: number[];
}
