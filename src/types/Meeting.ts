import { Location } from '@/types/UserDetails.ts';
import { MonthAvailability } from '@/types/MonthAvailability.ts';

export type Place = 'web' | 'in-person';

export enum MeetingState {
  CLOSED,
  FINISHED,
  PLANNED,
  APPROVED,
}

export interface Meeting {
  place?: Place | null;
  location?: Location | null;
  dateTime?: Date | null;
  interestedFor?: keyof MonthAvailability | null;

  puid?: string;
  buid?: string;
  state?: MeetingState;

  creation?: Date | null;

  meetingId?: string;
}
