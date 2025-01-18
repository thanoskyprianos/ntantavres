import { Location } from '@/types/UserDetails.ts';
import { WorkType } from '@/types/ParentAd.ts';

export type Gender = 'male' | 'female' | 'other';

export interface BabysitterTraits {
  experience?: string;
  studies?: string;
  about?: string;
  gender?: Gender;
}

export interface BabysitterAd {
  location?: Location | 'parentHome';
  type?: WorkType;
  description?: string;
  final?: boolean;
  uid?: string;
}
