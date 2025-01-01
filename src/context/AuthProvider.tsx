import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateEmail as updateEmailFirebase,
  updatePassword as updatePasswordFirebase,
  User,
} from 'firebase/auth';

import { Credentials } from '@/types/Credentials.ts';
import { auth } from '@config/firebase.ts';
import { useTranslation } from 'react-i18next';
import { useSnackbarContext } from '@/context/SnackbarProvider.tsx';
import { useNavigate } from 'react-router-dom';
import { useUserDetails } from '@hooks/useUserDetails.hook.ts';
import { UserDetails } from '@/types/UserDetails.ts';

export interface AuthProps {
  user: User | null;
  onLogIn: ({ email, password }: Credentials) => Promise<User>;
  onLogOut: () => void;
  onRegister: ({ email, password }: Credentials) => Promise<User>;
  isLoading: boolean;
  updateEmail: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
}

const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const dispatch = useSnackbarContext();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { updateUserDetails } = useUserDetails();

  useEffect(() => {
    setIsLoading(true);

    const unsubscribe = onAuthStateChanged(auth, localUser => {
      if (localUser !== null) {
        setUser(localUser);
      } else {
        if (user !== null) {
          dispatch!({
            type: 'warning',
            payload: { message: t('auth.expiredOut') },
          });

          setUser(null);
          setIsLoading(false);

          // TODO: FIX THIS
          navigate('/auth', { state: { from: location.pathname } });
        }

        setUser(null);
      }

      setIsLoading(false);
    });

    return () => {
      unsubscribe();
      setIsLoading(false);
    };
  }, [user]);

  const onLogIn = async ({ email, password }: Credentials) => {
    setIsLoading(true);
    try {
      const credentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(credentials.user);
      return credentials.user;
    } catch (err) {
      if (!(err instanceof Error)) {
        throw new Error();
      }

      console.log(err.message);

      if (err.message.includes('auth/invalid-email')) {
        throw new Error('Invalid email');
      } else if (err.message.includes('auth/wrong-password')) {
        throw new Error('Invalid password');
      } else {
        throw new Error('Login error');
      }
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
      return credentials.user;
    } catch {
      // TODO: check with regex maybe
      throw new Error(t('error.emailExists', { email: email }));
      // TODO: check for password and email errors (format validation)
    } finally {
      setIsLoading(false);
    }
  };

  const updateEmail = async (email: string) => {
    if (!user) {
      return;
    }

    setIsLoading(true);

    try {
      await updateEmailFirebase(user, email);
      await updateUserDetails(user, { email: email } as UserDetails);
    } catch (err) {
      if (!(err instanceof Error)) {
        throw new Error();
      }

      console.log(err.message);

      if (err.message.includes('auth/invalid-email')) {
        throw new Error('Invalid email');
      } else if (err.message.includes('auth/requires-recent-login')) {
        throw new Error('Login again');
      }

      throw new Error('Update email');
    } finally {
      setIsLoading(false);
    }
  };

  const updatePassword = async (password: string) => {
    if (!user) {
      return;
    }

    setIsLoading(true);

    try {
      await updatePasswordFirebase(user, password);
    } catch {
      throw new Error('Update password');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    onLogIn,
    onLogOut,
    onRegister,
    isLoading,
    updateEmail,
    updatePassword,
  } as AuthProps;
};

const AuthContext = createContext({} as AuthProps);
export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
