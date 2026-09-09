import { MonthAvailability } from '@/types/MonthAvailability.ts';
import { WhereFilterOp, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@config/firebase.ts';

export interface SearchCriterion {
  field: string;
  operator?: string;
  value: unknown;
}

export interface AdResult {
  id: string;
  name: string;
  photoUrl: string;
  type?: string;
  duration?: number;
  children?: { age: number }[];
  description?: string;
}

export const removeEmptyFields = (obj?: object) =>
  Object.fromEntries(Object.entries(obj ?? {}).filter(([, v]) => !!v));

export const isEmpty = (obj?: object) => Object.entries(obj ?? {}).length === 0;

export const queryAdsForCollection = async (
  collectionName: string,
  criteria: SearchCriterion[]
) => {
  const collectionRef = collection(db, collectionName);
  const constraints = criteria.map(({ field, operator, value }) =>
    where(field, (operator || '==') as WhereFilterOp, value)
  );

  return await getDocs(query(collectionRef, ...constraints));
};

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
