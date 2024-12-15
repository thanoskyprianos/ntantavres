import { Button, Paper, Stack } from '@mui/material';
import { TextFieldSmall } from '../util/TextFieldSmall.tsx';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth.hook.ts';
import { useNavigate } from 'react-router-dom';
import { LoadingSpinner } from '../LoadingSpinner.tsx';

export const LoginCard = () => {
  const { t } = useTranslation();
  const { user, onLogIn, onLogOut, onRegister, isLoading } = useAuth();
  const navigate = useNavigate();

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
      // TODO: show success message on snackbar
      navigate('/parent/profile');
    } catch (err) {
      // TODO: show error message on snackbar
      console.log(err);
    }
  };

  return (
    <Paper
      sx={{
        width: '300px',
        borderRadius: '15px',
      }}
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
            >
              {t('auth.login')}
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};
