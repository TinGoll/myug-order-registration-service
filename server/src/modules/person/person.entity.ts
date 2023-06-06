import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import PersonTypes from './person-types';
import { Role } from '../auth/roles.enum';

@Entity('persons')
export class Person implements PersonTypes.Person {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar' })
  login: string;
  @Column({ type: 'varchar', length: 256 })
  password?: string;
  @Column({ type: 'varchar', nullable: true })
  firstName?: string;
  @Column({ type: 'varchar', nullable: true })
  lastName?: string;
  @Column({ type: 'varchar', nullable: true })
  middleName?: string;
  @Column({ type: 'varchar', nullable: true })
  phone?: string;
  @Column({ type: 'varchar', nullable: true })
  email?: string;
  @Column({ type: 'enum', enum: Role, default: Role.CLIENT })
  role: Role;
}
