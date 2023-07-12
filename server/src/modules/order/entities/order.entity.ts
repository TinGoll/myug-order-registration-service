import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import OrderTypes from '../../../cammon/types/order-types';
import { OrderDocument } from './document.entity';
import { Person } from '../../person/person.entity';

@Entity('orders')
export class Order implements OrderTypes.Order {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'integer', nullable: true })
  itmId: number;
  @Column({ type: 'varchar', nullable: true })
  note: string;
  @Column({ type: 'varchar', nullable: true })
  clientNumner: string;
  @CreateDateColumn()
  createdAt: string | Date;
  @UpdateDateColumn()
  updatedAt: string | Date;
  @Column({ type: 'varchar', nullable: true })
  status: string;
  @Column({ type: 'jsonb', default: {} })
  result: object;
  @Column({ type: 'boolean', default: false })
  deleted: boolean;

  @ManyToOne((author) => Person, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'authorId' })
  author: OrderTypes.Author;

  @ManyToOne((client) => Person, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'clientId' })
  client: OrderTypes.Client;

  @ManyToOne((manager) => Person, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'managerId' })
  manager: OrderTypes.Manager;

  @OneToMany(() => OrderDocument, (document) => document.order)
  documents: OrderTypes.Document[];
}
