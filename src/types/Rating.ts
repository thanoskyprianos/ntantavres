export type ValidRating = 1 | 2 | 3 | 4 | 5;

export interface Rating {
  rating?: ValidRating;
  description?: string;
  puid?: string;
  time?: Date;
  ratingId?: string;
}
