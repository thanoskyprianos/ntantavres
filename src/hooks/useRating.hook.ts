import { addDoc } from '@firebase/firestore';
import { db } from '@config/firebase.ts';
import { collection, getDocs } from 'firebase/firestore';
import { Rating } from '@/types/Rating.ts';
import { useState } from 'react';

const _addRating = (uid: string, rating: Rating) => {
  return addDoc(collection(db, 'user', uid, 'ratings'), { ...rating });
};

const _getRatings = (uid: string) => {
  return getDocs(collection(db, 'user', uid, 'ratings'));
};

export const useRating = () => {
  const [isLoading, setIsLoading] = useState(false);

  const addRating = async (uid: string, rating: Rating) => {
    setIsLoading(true);

    try {
      await _addRating(uid, rating);
    } catch {
      throw new Error();
    } finally {
      setIsLoading(false);
    }
  };

  const getRatings = async (uid: string) => {
    setIsLoading(true);

    let data: Rating[] | undefined;
    try {
      data = (await _getRatings(uid)).docs.map(doc => {
        const data = doc.data() as Rating;
        data.ratingId = doc.id;
        return data;
      });
    } catch {
      data = undefined;
    } finally {
      setIsLoading(false);
    }

    return data;
  };

  return {
    isLoading,
    addRating,
    getRatings,
  };
};
