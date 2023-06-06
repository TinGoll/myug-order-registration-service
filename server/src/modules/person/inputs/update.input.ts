import { Role } from 'src/modules/auth/roles.enum';
import PersonTypes from '../person-types';

export class PersonUpdateInput implements Partial<PersonTypes.Person> {
  id: number;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  email?: string;
  phone?: string;
  password?: string;
  role?: Role;
}
