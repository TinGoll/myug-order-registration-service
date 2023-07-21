import { Role } from 'src/modules/auth/roles.enum';

export interface Person {
  id: number;
  login: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  phone?: string;
  email?: string;
  role: Role;
}
