import PersonTypes from '../person-types';

export class PersonLoginInput implements Partial<PersonTypes.Person> {
  login: string;
  password: string;
}
