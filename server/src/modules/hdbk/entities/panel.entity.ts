import OrderTypes from 'src/cammon/types/order-types';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('panels')
export class Panel implements OrderTypes.PanelModel {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 128, nullable: false })
  name: string;
}
