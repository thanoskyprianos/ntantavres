import { db } from '../config/firebase.ts';
import { User } from 'firebase/auth';
import { UserDetails } from '../types/UserDetails.ts';
import { doc, setDoc } from 'firebase/firestore';
import { Avatar, Base64String } from '../types/Avatar.ts';

export const setUserAvatar = async (user: User, avatar?: Base64String) => {
  if (!avatar) {
    return Promise.resolve();
  }
  
  return await setDoc(doc(db, 'avatar', user.uid), { data: avatar } as Avatar);
};

export const setUserDetails = (user: User, details: UserDetails) => {
  return setDoc(doc(db, 'user', user.uid), { details });
};

export const registerUser = (
  user: User,
  details: UserDetails,
  avatar?: Base64String
) => {
  return Promise.all([
    setUserDetails(user, details),
    setUserAvatar(user, avatar),
  ]);
};
