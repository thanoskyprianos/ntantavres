import { db } from '@config/firebase.ts';
import { User } from 'firebase/auth';
import { UserDetails } from '../types/UserDetails.ts';
import {
  doc,
  getDoc,
  runTransaction,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { chunk, CHUNK_LIMIT } from '@util/imageManipulation.util.ts';
import { useState } from 'react';
import { useSnackbarContext } from '@/context/SnackbarProvider.tsx';
import { useTranslation } from 'react-i18next';
import { Base64String } from '@/types/Avatar.ts';

const _setUserAvatar = async (user: User, avatar?: Base64String) => {
  if (!avatar) {
    return Promise.resolve();
  }

  const chunks = chunk(avatar);

  if (!chunks || chunks.length > CHUNK_LIMIT) {
    return Promise.reject();
  }

  return runTransaction(db, async transaction => {
    const size = (
      await transaction.get(doc(db, 'user', user.uid, 'avatar', 'size'))
    ).get('data') as number;

    // delete old avatar data
    for (let i = 0; i < size; i++) {
      transaction.delete(doc(db, 'user', user.uid, 'avatar', i.toString()));
    }

    // save new chunks
    chunks.forEach((chunk, i) => {
      transaction.set(doc(db, 'user', user.uid, 'avatar', i.toString()), {
        data: chunk,
      });
    });

    // set new size
    transaction.set(doc(db, 'user', user.uid, 'avatar', 'size'), {
      data: chunks.length,
    });
  });
};

const _setUserDetails = (user: User, details: UserDetails) => {
  return setDoc(doc(db, 'user', user.uid), { ...details });
};

const _registerUser = (
  user: User,
  details: UserDetails,
  avatar?: Base64String
) => {
  return Promise.all([
    _setUserDetails(user, details),
    _setUserAvatar(user, avatar),
  ]);
};

const _updateUserDetails = (user: User, details: UserDetails) => {
  return updateDoc(doc(db, 'user', user.uid), { ...details });
};

const _getUserDetails = (uid: string) => {
  return getDoc(doc(db, 'user', uid));
};

const _getUserAvatar = async (uid: string) => {
  return runTransaction(db, async transaction => {
    let b64 = '';

    const sizeDoc = await transaction.get(
      doc(db, 'user', uid, 'avatar', 'size')
    );

    if (!sizeDoc.exists()) {
      throw new Error('No avatar');
    }

    const size = sizeDoc.get('data') as number;
    for (let i = 0; i < size; i++) {
      const chunk = await transaction.get(
        doc(db, 'user', uid, 'avatar', i.toString())
      );

      if (!chunk.exists()) {
        throw new Error();
      }

      b64 += chunk.get('data');
    }

    return b64;
  });
};

export const useUserDetails = () => {
  const dispatch = useSnackbarContext();
  const { t } = useTranslation();
  const [isRequesting, setIsRequesting] = useState(false);

  const getUserDetails = async (uid: string) => {
    setIsRequesting(true);

    const doc = (await _getUserDetails(uid)).data();

    setIsRequesting(false);

    if (!doc) {
      throw new Error();
    }

    return doc;
  };

  const getUserAvatar = async (uid: string) => {
    setIsRequesting(true);
    let b64 = '';

    try {
      b64 = await _getUserAvatar(uid);
    } catch (err) {
      if (!(err instanceof Error)) {
        throw new Error();
      }

      if (err.message === 'No avatar') {
        return;
      }

      dispatch!({ type: 'error', payload: { message: t('error.avatarGet') } });
    } finally {
      setIsRequesting(false);
    }

    return b64;
  };

  const setUserDetails = async (user: User, details: UserDetails) => {
    setIsRequesting(true);

    await _setUserDetails(user, details);

    setIsRequesting(false);
  };

  const setUserAvatar = async (user: User, avatar: Base64String) => {
    setIsRequesting(true);

    try {
      await _setUserAvatar(user, avatar);
    } catch {
      dispatch!({ type: 'error', payload: { message: t('error.avatarSet') } });
    } finally {
      setIsRequesting(false);
    }
  };

  const updateUserDetails = async (user: User, details: UserDetails) => {
    setIsRequesting(true);

    try {
      await _updateUserDetails(user, details);
    } catch {
      dispatch!({
        type: 'error',
        payload: { message: t('error.updatingDetails') },
      });
      throw new Error();
    } finally {
      setIsRequesting(false);
    }
  };

  const registerUser = async (
    user: User,
    details: UserDetails,
    avatar?: Base64String
  ) => {
    setIsRequesting(true);

    try {
      await _registerUser(user, details, avatar);
    } catch (err) {
      if (!(err instanceof Error)) {
        throw new Error();
      }

      if (err.message.includes('auth/invalid-email')) {
        throw new Error('Invalid email');
      } else {
        throw new Error('Auth error');
      }
    }

    setIsRequesting(false);
  };

  return {
    isRequesting,
    getUserDetails,
    getUserAvatar,
    setUserDetails,
    setUserAvatar,
    registerUser,
    updateUserDetails,
  };
};
