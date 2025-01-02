import { Child } from '@/types/Child.ts';

export type WorkDuration = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type WorkType = 'PART_TIME' | 'FULL_TIME';

export interface ParentAd {
  location: string;
  duration: WorkDuration;
  type: WorkType;
  children: Child[];
  description?: string;
}
