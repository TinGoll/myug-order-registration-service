import { Role } from "./roles.enum";

declare module PersonTypes {
  interface Person {
    id: number;
    login: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    middleName?: string;
    phone?: string;
    email?: string;
    role: Role;
  }
}

export default PersonTypes;
