export type Role = 'PARENT' | 'BABYSITTER';

export interface UserDetails {
  firstName: string;
  lastName: string;
  email: string;
  birthdate: Date;
  role: Role;
}
