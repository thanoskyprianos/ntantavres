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
  User,
} from 'firebase/auth';
import { Credentials } from '@/types/Credentials.ts';
import { auth } from '@config/firebase.ts';
import { useTranslation } from 'react-i18next';
import { useSnackbarContext } from '@/context/SnackbarProvider.tsx';
import { useLocation, useNavigate } from 'react-router-dom';

export interface AuthProps {
  user: User | null;
  onLogIn: ({ email, password }: Credentials) => Promise<User>;
  onLogOut: () => void;
  onRegister: ({ email, password }: Credentials) => Promise<User>;
  isLoading: boolean;
}

const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const dispatch = useSnackbarContext();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

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

          navigate('/', { state: { from: location } });
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
      return credentials.user;
    } catch {
      // TODO: check with regex maybe
      throw new Error(t('error.emailExists', { email: email }));
      // TODO: check for password and email errors (format validation)
    } finally {
      setIsLoading(false);
    }
  };

  return { user, onLogIn, onLogOut, onRegister, isLoading } as AuthProps;
};

const AuthContext = createContext({} as AuthProps);
export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
