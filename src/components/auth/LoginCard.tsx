import { Button, Paper, Stack } from '@mui/material';
import { TextFieldSmall } from '../util/TextFieldSmall.tsx';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

export const LoginCard = () => {
  const { t } = useTranslation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClear = () => {
    setEmail('');
    setPassword('');
  };

  const handleLogin = () => {
    if (!email || !password) {
      return;
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
        />
        <TextFieldSmall
          required
          label={t('textField.password')}
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
        />
        <Stack direction="row" spacing={2} sx={{ justifyContent: 'end' }}>
          <Button variant="text" onClick={handleClear}>
            {t('auth.clear')}
          </Button>
          <Button variant="contained" onClick={handleLogin}>
            {t('auth.login')}
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};
