import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  OneToMany,
} from 'typeorm';
import OrderTypes from '../types/order-types';

@Entity('orders')
export class Order implements OrderTypes.Order {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  itmId: number;
  @Column()
  clientNumner: string;
  @CreateDateColumn()
  createdAt: string | Date;
  @UpdateDateColumn()
  updatedAt: string | Date;
  @Column()
  status: string;
  @Column({ type: 'jsonb', default: {} })
  result: object;

 
  documents: OrderTypes.Document[];
  author: OrderTypes.Author;
  client: OrderTypes.Client;
}
