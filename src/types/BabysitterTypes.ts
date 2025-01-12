import { Location } from '@/types/UserDetails.ts';
import { WorkType } from '@/types/ParentAd.ts';

export interface BabysitterTraits {
  experience?: string;
  studies?: string;
  about?: string;
}

export interface BabysitterAd {
  location?: Location | 'parentHome';
  type?: WorkType;
  description?: string;
  final?: boolean;
}
