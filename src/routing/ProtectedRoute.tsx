import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthContext } from '@/context/AuthProvider.tsx';
import { LoadingSpinner } from '@components/LoadingSpinner.tsx';
import { useSnackbarContext } from '@/context/SnackbarProvider.tsx';
import { useTranslation } from 'react-i18next';

export const ProtectedRoute = () => {
  const { user, isLoading } = useAuthContext();
  const location = useLocation();
  const dispatch = useSnackbarContext();
  const { t } = useTranslation();

  if (!user) {
    if (isLoading) {
      return <LoadingSpinner />;
    } else {
      dispatch!({ type: 'info', payload: { message: t('auth.loginFirst') } });
      return <Navigate to={'auth'} state={{ from: location }} />;
    }
  } else {
    return <Outlet />;
  }
};
