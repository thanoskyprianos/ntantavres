import { useAuthContext } from '@/context/AuthProvider.tsx';
import { useState } from 'react';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '@config/firebase.ts';
import { ParentAd } from '@/types/ParentAd.ts';
import {
  AdResult,
  queryAdsForCollection,
  SearchCriterion,
} from '@util/util.ts';

const _getAd = (uuid: string) => {
  return getDoc(doc(db, 'parent_ad', uuid));
};

const _setAd = (uuid: string, ad: ParentAd) => {
  return setDoc(doc(db, 'parent_ad', uuid), { ...ad });
};

const _updateAd = (uuid: string, ad: ParentAd) => {
  return updateDoc(doc(db, 'parent_ad', uuid), { ...ad });
};

const _queryAds = async (criteria: SearchCriterion[]) => {
  return queryAdsForCollection('parent_ad', criteria);
};

export const useParent = () => {
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  const getAd = async (uuid: string) => {
    setIsLoading(true);

    const data = (await _getAd(uuid)).data() as ParentAd;

    setIsLoading(false);

    if (!data) {
      throw new Error();
    }

    return data;
  };

  const setAd = async (ad: ParentAd) => {
    if (!user) {
      throw new Error();
    }

    ad.uid = user.uid;

    setIsLoading(true);

    await _setAd(user.uid, ad);

    setIsLoading(false);
  };

  const updateAd = async (ad: ParentAd) => {
    if (!user) {
      throw new Error();
    }

    setIsLoading(true);

    await _updateAd(user.uid, ad);

    setIsLoading(false);
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

  return { getAd, setAd, updateAd, queryAds, isLoading };
};
