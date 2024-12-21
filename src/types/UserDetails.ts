export type Role = 'PARENT' | 'BABYSITTER';

export interface UserDetails {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  birthdate: Date;
  role: Role;
  // TODO: refactor this (fetch from actual data if we have time???)
  address?: string;
  phoneNumber?: string;

  // TODO: also add the job offer ad
}
