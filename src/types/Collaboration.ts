import { ParentAd, WorkType } from '@/types/ParentAd.ts';
import { BabysitterAd } from '@/types/BabysitterTypes.ts';
import { Meeting } from '@/types/Meeting.ts';
import { MonthAvailability } from '@/types/MonthAvailability.ts';
import { Location } from '@/types/UserDetails.ts';

export enum CollaborationState {
  TEMPORARY,
  ONGOING,
  AWAITING_PAYMENT,
  FINISHED,
}

export interface Collaboration {
  parentAd?: ParentAd | null;
  babysitterAd?: BabysitterAd | null;
  appointment?: Meeting | null;

  // final
  location?: Location | null;
  type?: WorkType | null;
  currentMonth?: keyof MonthAvailability | null;

  state?: CollaborationState | null;

  parentSignature?: boolean | null;
  babysitterSignature?: boolean | null;

  puid?: string;
  buid?: string;

  collaborationId?: string;
}
