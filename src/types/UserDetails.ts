export type Role = 'PARENT' | 'BABYSITTER';

export interface UserDetails {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  birthdate: Date;
  role: Role;
}
