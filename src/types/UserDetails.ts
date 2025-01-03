export type Role = 'PARENT' | 'BABYSITTER';

export interface Location {
  number?: number;
  address?: string;
  city?: string;
}

export interface UserDetails {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  birthdate: Date;
  role: Role;
  location?: Location;
  phoneNumber?: string;
}
