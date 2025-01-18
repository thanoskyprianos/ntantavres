import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '@config/firebase.ts';
import { Collaboration } from '@/types/Collaboration.ts';
import { useState } from 'react';
import {
  addDoc,
  collection,
  getDocs,
  or,
  query,
  where,
} from '@firebase/firestore';
import { Payment } from '@/types/Payment.ts';

const collaborationsOf = (uid: string) =>
  query(
    collection(db, 'collab'),
    or(where('puid', '==', uid), where('buid', '==', uid))
  );

const _getCollaborationsOf = (uid: string) => {
  return getDocs(collaborationsOf(uid));
};

const _getCollaboration = (collabId: string) => {
  return getDoc(doc(db, 'collab', collabId));
};

const _setCollaboration = (collabId: string, collab: Collaboration) => {
  return setDoc(doc(db, 'collab', collabId), { ...collab });
};

const _updateCollaboration = (collabId: string, collab: Collaboration) => {
  return updateDoc(doc(db, 'collab', collabId), { ...collab });
};

const _doPayment = (payment: Payment) => {
  return addDoc(collection(db, 'payment'), { ...payment });
};

export const useCollaboration = () => {
  const [isLoading, setIsLoading] = useState(false);

  const getCollaborationsOf = async (uid: string) => {
    setIsLoading(true);

    let data: Collaboration[] | undefined;
    try {
      data = (await _getCollaborationsOf(uid)).docs.map(doc => {
        const data = doc.data() as Collaboration;
        data.collaborationId = doc.id;
        return data;
      });
    } catch {
      data = undefined;
    } finally {
      setIsLoading(false);
    }

    return data;
  };

  const getCollaboration = async (collabId: string) => {
    setIsLoading(true);

    let data: Collaboration | undefined;
    try {
      const doc = await _getCollaboration(collabId);
      data = doc.data() as Collaboration;
      data.collaborationId = doc.id;
    } catch {
      data = undefined;
    } finally {
      setIsLoading(false);
    }

    return data;
  };

  const setCollaboration = async (collabId: string, collab: Collaboration) => {
    setIsLoading(true);

    try {
      await _setCollaboration(collabId, collab);
    } catch {
      throw new Error();
    } finally {
      setIsLoading(false);
    }
  };

  const doPayment = async (payment: Payment) => {
    setIsLoading(true);

    try {
      await _doPayment(payment);
    } catch {
      throw new Error();
    } finally {
      setIsLoading(false);
    }
  };

  const updateCollaboration = async (
    collabId: string,
    collab: Collaboration
  ) => {
    setIsLoading(true);

    try {
      await _updateCollaboration(collabId, collab);
    } catch (err) {
      console.log(err);
      throw new Error();
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    getCollaborationsOf,
    getCollaboration,
    setCollaboration,
    updateCollaboration,
    doPayment,
  };
};
