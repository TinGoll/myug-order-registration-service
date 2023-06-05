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
    roles: Role;
  }

  type Role = 'ADMIN' | 'MANAGER' | 'CLIENT';
}

export default PersonTypes;
