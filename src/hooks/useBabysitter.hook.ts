import { useState } from 'react';
import { MonthAvailability } from '@/types/MonthAvailability.ts';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@config/firebase.ts';
import { BabysitterAd } from '@/types/BabysitterAd.ts';

const _getAvailability = (uid: string) => {
  return getDoc(doc(db, 'availability', uid));
};

const _setAvailability = (uid: string, availability: MonthAvailability) => {
  return setDoc(doc(db, 'availability', uid), { ...availability });
};

const _getAd = (uid: string) => {
  return getDoc(doc(db, 'babysitter_ad', uid));
};

const _setAd = (uid: string, ad: BabysitterAd) => {
  return setDoc(doc(db, 'babysitter_ad', uid), { ...ad });
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

  const getAd = async (uid: string) => {
    setIsLoading(true);

    let data: BabysitterAd = {};
    try {
      data = (await _getAd(uid)).data() as BabysitterAd;
    } catch {
      data = {};
    } finally {
      setIsLoading(false);
    }

    return data;
  };

  const setAd = async (uid: string, ad: BabysitterAd) => {
    setIsLoading(true);

    try {
      await _setAd(uid, ad);
    } catch {
      throw new Error();
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getAvailability,
    setAvailability,
    getAd,
    setAd,
    isLoading,
  };
};
