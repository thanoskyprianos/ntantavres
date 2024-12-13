import { Divider, Stack, Typography } from '@mui/material';
import { RegisterCard } from '../../components/auth/RegisterCard.tsx';
import { useDeviceDetect } from '../../hooks/useDeviceDetect.hook.ts';
import { LoginCard } from '../../components/auth/LoginCard.tsx';
import { useTranslation } from 'react-i18next';

export const AuthPage = () => {
  const { t } = useTranslation();
  const { device } = useDeviceDetect();

  return (
    <>
      <Stack
        sx={{ placeContent: 'center', paddingX: '15px' }}
        divider={
          <Divider
            flexItem
            orientation={device === 'mobile' ? 'horizontal' : 'vertical'}
            textAlign="center"
          >
            {t('general.or')}
          </Divider>
        }
        direction={device === 'mobile' ? 'column' : 'row'}
        spacing={2}
      >
        <Stack sx={{ placeItems: 'center' }} spacing={1}>
          <Typography variant="h4">{t('auth.login')}</Typography>
          <LoginCard />
        </Stack>
        <Stack sx={{ placeItems: 'center' }} spacing={1}>
          <Typography variant="h4">{t('auth.register')}</Typography>
          <RegisterCard />
        </Stack>
      </Stack>
    </>
  );
};
