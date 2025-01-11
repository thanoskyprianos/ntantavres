import { useState } from 'react';
import { MonthAvailability } from '@/types/MonthAvailability.ts';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@config/firebase.ts';

const _getAvailability = (uid: string) => {
  return getDoc(doc(db, 'availability', uid));
};

const _setAvailability = (uid: string, availability: MonthAvailability) => {
  return setDoc(doc(db, 'availability', uid), { ...availability });
};

export const useBabysitter = () => {
  const [isLoading, setIsLoading] = useState(false);

  const getAvailability = async (uid: string) => {
    setIsLoading(true);

    let data: MonthAvailability = {};

    try {
      data = (await _getAvailability(uid)).data() as MonthAvailability;
    } catch {
      data = {};
    } finally {
      setIsLoading(false);
    }

    return data;
  };

  const setAvailability = async (
    uid: string,
    availability: MonthAvailability
  ) => {
    setIsLoading(true);

    try {
      await _setAvailability(uid, availability);
    } catch {
      throw new Error();
    } finally {
      setIsLoading(false);
    }
  };

  return { getAvailability, setAvailability, isLoading };
};
