import { Button, Paper, Stack } from '@mui/material';
import { TextFieldSmall } from '@components/util/TextFieldSmall.tsx';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LoadingSpinner } from '@components/LoadingSpinner';
import { useAuthContext } from '@/context/AuthProvider.tsx';
import { useSnackbarContext } from '@/context/SnackbarProvider.tsx';

export const LoginCard = () => {
  const { t } = useTranslation();
  const { onLogIn, isLoading } = useAuthContext();
  const dispatch = useSnackbarContext();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClear = () => {
    setEmail('');
    setPassword('');
  };

  const handleLogin = async () => {
    if (!email || !password) {
      return;
    }

    try {
      await onLogIn({ email, password });

      dispatch!({
        type: 'success',
        payload: { message: t('auth.successfulLogin') },
      });
      navigate(location?.state?.from || '/parent/profile');
    } catch (err) {
      if (!(err instanceof Error)) {
        throw err;
      }

      dispatch!({ type: 'error', payload: { message: err.message } });
      handleClear();
    }
  };

  return (
    <Paper
      sx={{
        width: '300px',
        borderRadius: '15px',
      }}
      component="form"
      onSubmit={e => e.preventDefault()}
    >
      <Stack spacing={2} sx={{ padding: '15px' }}>
        <TextFieldSmall
          required
          label={t('textField.email')}
          value={email}
          onChange={e => setEmail(e.target.value)}
          type="email"
          disabled={isLoading}
        />
        <TextFieldSmall
          required
          label={t('textField.password')}
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          disabled={isLoading}
        />
        <Stack
          direction="row"
          spacing={2}
          sx={{ justifyContent: 'space-between', alignItems: 'center' }}
        >
          {isLoading ? (
            <LoadingSpinner size="25px" sx={{ paddingLeft: '30px' }} />
          ) : (
            // dummy div to make space-between work
            <div></div>
          )}
          <Stack direction="row" spacing={2}>
            <Button variant="text" onClick={handleClear} disabled={isLoading}>
              {t('auth.clear')}
            </Button>
            <Button
              variant="contained"
              onClick={handleLogin}
              disabled={isLoading}
              type="submit"
            >
              {t('auth.login')}
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};
