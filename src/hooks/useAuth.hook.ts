import { useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';
import { auth } from '../config/firebase.ts';
import { Credentials } from '../types/Credentials.ts';
import { useTranslation } from 'react-i18next';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user !== null) {
        setUser(user);
      } else {
        setUser(null);
      }

      setIsLoading(false);
    });

    return () => {
      unsubscribe();
      setIsLoading(false);
    };
  }, []);

  const onLogIn = async ({ email, password }: Credentials) => {
    setIsLoading(true);
    try {
      const credentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(credentials.user);
    } catch {
      throw new Error(t('error.invalidCredentials'));
    } finally {
      setIsLoading(false);
    }
  };

  const onLogOut = () => {
    setIsLoading(true);
    signOut(auth).then(() => {
      setUser(null);
      setIsLoading(false);
    });
  };

  const onRegister = async ({ email, password }: Credentials) => {
    setIsLoading(true);
    try {
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(credentials.user);
    } catch {
      // TODO: check with regex maybe
      throw new Error(t('error.emailExists', { email: email }));
    } finally {
      setIsLoading(false);
    }
  };

  return { user, onLogIn, onLogOut, onRegister, isLoading };
};
