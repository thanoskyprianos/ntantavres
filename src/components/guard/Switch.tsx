import { ReactNode } from 'react';
import { useAuthContext } from '@/context/AuthProvider.tsx';

interface SwitchProps {
  uid: string;
  a: ReactNode;
  b?: ReactNode;
  c?: ReactNode;
}

export const Switch = ({ uid, a, b, c }: SwitchProps) => {
  const { user } = useAuthContext();

  if (user) {
    if (user.uid === uid) {
      return a;
    } else {
      return b;
    }
  } else {
    return c;
  }
};
