import { MonthAvailability } from '@/types/MonthAvailability.ts';

export const removeEmptyFields = (obj: any) =>
  Object.fromEntries(Object.entries(obj).filter(([_, v]) => !!v));

export const isEmpty = (obj: any) => Object.entries(obj).length === 0;

// for some reason timestamps are different in firestore
export const firestoreTimestampToDate = (obj?: Date | null) => {
  return new Date((obj as unknown as { seconds: number }).seconds * 1000);
};

export const monthSort = (month: keyof MonthAvailability) => {
  switch (month) {
    case 'january':
      return 0;
    case 'february':
      return 1;
    case 'march':
      return 2;
    case 'april':
      return 3;
    case 'may':
      return 4;
    case 'june':
      return 5;
    case 'july':
      return 6;
    case 'august':
      return 7;
    case 'september':
      return 8;
    case 'october':
      return 9;
    case 'november':
      return 11;
    case 'december':
      return 12;
  }
};
