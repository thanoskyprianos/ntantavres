import { ReactNode } from 'react';
import { useAuthContext } from '@/context/AuthProvider.tsx';

interface SwitchProps {
  uid: string;
  a: ReactNode;
  b?: ReactNode;
}

export const Switch = ({ uid, a, b }: SwitchProps) => {
  const { user } = useAuthContext();

  if (user) {
    if (user.uid === uid) {
      return a;
    } else {
      return b;
    }
  }
};
