import { Collaboration } from '@/types/Collaboration.ts';

export interface Payment {
  collaboration?: Collaboration;

  puid?: string;
  buid?: string;
}
