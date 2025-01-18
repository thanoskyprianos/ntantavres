import { Location } from '@/types/UserDetails.ts';
import { MonthAvailability } from '@/types/MonthAvailability.ts';

export type Place = 'web' | 'in-person';

export enum State {
  PLANNED,
  FINISHED,
  CLOSED,
}

export interface Meeting {
  name?: string;
  place?: Place | null;
  location?: Location | null;
  dateTime?: Date | null;
  interestedFor: keyof MonthAvailability | null;

  uida?: string;
  uidb?: string;
  state?: State;

  creation?: Date | null;

  meetingId?: string;
}
