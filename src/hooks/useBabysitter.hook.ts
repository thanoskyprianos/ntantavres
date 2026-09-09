import { useState } from 'react';
import { MonthAvailability } from '@/types/MonthAvailability.ts';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '@config/firebase.ts';
import { BabysitterAd, BabysitterTraits } from '@/types/BabysitterTypes.ts';
import {
  AdResult,
  queryAdsForCollection,
  SearchCriterion,
} from '@util/util.ts';

const _getAvailability = (uid: string) => {
  return getDoc(doc(db, 'availability', uid));
};

const _setAvailability = (uid: string, availability: MonthAvailability) => {
  return setDoc(doc(db, 'availability', uid), { ...availability });
};

const _getTraits = (uid: string) => {
  return getDoc(doc(db, 'babysitter_traits', uid));
};

const _setTraits = (uid: string, ad: BabysitterTraits) => {
  return setDoc(doc(db, 'babysitter_traits', uid), { ...ad });
};

const _getAd = (uid: string) => {
  return getDoc(doc(db, 'babysitter_ad', uid));
};

const _setAd = (uid: string, ad: BabysitterAd) => {
  return setDoc(doc(db, 'babysitter_ad', uid), { ...ad, final: false });
};

const _updateAd = (uid: string, ad: BabysitterAd) => {
  return updateDoc(doc(db, 'babysitter_ad', uid), { ...ad });
};

const _queryAds = async (criteria: SearchCriterion[]) => {
  return queryAdsForCollection('babysitter_ad', criteria);
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

  const getTraits = async (uid: string) => {
    setIsLoading(true);

    let data: BabysitterTraits = {};
    try {
      data = (await _getTraits(uid)).data() as BabysitterTraits;
    } catch {
      data = {};
    } finally {
      setIsLoading(false);
    }

    return data;
  };

  const setTraits = async (uid: string, ad: BabysitterTraits) => {
    setIsLoading(true);

    try {
      await _setTraits(uid, ad);
    } catch {
      throw new Error();
    } finally {
      setIsLoading(false);
    }
  };

  const getAd = async (uid: string) => {
    setIsLoading(true);

    let data: BabysitterAd | undefined = undefined;
    try {
      data = (await _getAd(uid)).data() as BabysitterAd;
    } catch {
      data = undefined;
    } finally {
      setIsLoading(false);
    }

    return data;
  };

  const setAd = async (uid: string, ad: BabysitterAd) => {
    setIsLoading(true);

    ad.uid = uid;

    try {
      await _setAd(uid, ad);
    } catch {
      throw new Error();
    } finally {
      setIsLoading(false);
    }
  };

  const updateAd = async (uid: string, ad: BabysitterAd) => {
    setIsLoading(true);

    try {
      await _updateAd(uid, ad);
    } catch (err) {
      console.log(err);
      throw new Error();
    } finally {
      setIsLoading(false);
    }
  };

  const queryAds = async (criteria: SearchCriterion[]) => {
    setIsLoading(true);

    const adsSnapshot = await _queryAds(criteria);
    const adsList = adsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as AdResult[];

    setIsLoading(false);

    return adsList;
  };

  return {
    getAvailability,
    setAvailability,
    getTraits,
    setTraits,
    getAd,
    setAd,
    updateAd,
    isLoading,
    queryAds,
  };
};
