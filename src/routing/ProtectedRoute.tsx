import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthContext } from '@/context/AuthProvider.tsx';
import { LoadingSpinner } from '@components/LoadingSpinner.tsx';
import { useSnackbarContext } from '@/context/SnackbarProvider.tsx';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

export const ProtectedRoute = () => {
  const { user, isLoading } = useAuthContext();
  const location = useLocation();
  const dispatch = useSnackbarContext();
  const { t } = useTranslation();

  useEffect(() => {
    if (!user && !isLoading) {
      dispatch!({ type: 'info', payload: { message: t('auth.loginFirst') } });
    }
  }, [isLoading, user, dispatch, t]);

  if (isLoading) {
    return <LoadingSpinner />;
  } else if (!user) {
    return <Navigate to={'auth'} state={{ from: location }} />;
  }

  return <Outlet />;
};
