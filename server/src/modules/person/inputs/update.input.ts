import PersonTypes from '../person-types';

export class PersonUpdateInput implements Partial<PersonTypes.Person> {
  id: number;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  email?: string;
  phone?: string;
  password?: string;
  roles?: PersonTypes.Role;
}
