import { useAuthContext } from '@/context/AuthProvider.tsx';
import { ReactNode } from 'react';

interface PrivateComponentProps {
  uid: string;
  children: ReactNode;
  onFail?: () => void;
}

export const PrivateComponent = ({
  children,
  uid,
  onFail,
}: PrivateComponentProps) => {
  const { user } = useAuthContext();

  if (user) {
    if (user.uid === uid) {
      return children;
    } else if (onFail) {
      onFail();
    }
  }
};
