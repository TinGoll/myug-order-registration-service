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

  interface RegistrationInput extends Partial<Omit<Person, "id" | "role">> {
    login: string;
    password: string;
    firstName: string;
  }

  interface LoginInput {
    login: string;
    password: string;
  }

  interface LoginResponse {
    token: string;
    person: Person;
  }

  interface Verification {
    token: string;
  }
}

export default PersonTypes;
