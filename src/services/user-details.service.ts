import { db } from '../config/firebase.ts';
import { User } from 'firebase/auth';
import { UserDetails } from '../types/UserDetails.ts';
import { doc, setDoc } from 'firebase/firestore';
import { Avatar, Base64String } from '../types/Avatar.ts';
import i18n from 'i18next';

const toBase64 = (file?: File): Promise<Base64String | void> => {
  if (!file) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

export const setUserAvatar = async (user: User, avatar?: File) => {
  // TODO: add 1mb size limit (after b64)

  const b64 = await toBase64(avatar);
  if (!b64) {
    throw new Error(i18n.t('auth.avatarError'));
  }
  return await setDoc(doc(db, 'avatar', user.uid), { data: b64 } as Avatar);
};

export const setUserDetails = (user: User, details: UserDetails) => {
  return setDoc(doc(db, 'user', user.uid), { details });
};

export const registerUser = (
  user: User,
  details: UserDetails,
  avatar?: File
) => {
  return Promise.all([
    setUserDetails(user, details),
    setUserAvatar(user, avatar),
  ]);
};
