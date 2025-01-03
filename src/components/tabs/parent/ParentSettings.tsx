import { Card, CardHeader, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ParentDetailsSettings } from '@components/tabs/parent/settings/ParentDetailsSettigns.tsx';
import { AuthSettings } from '@components/tabs/common/settings/AuthSettings.tsx';
import { useDeviceDetect } from '@hooks/useDeviceDetect.hook.ts';

export const ParentSettings = () => {
  const { t } = useTranslation();
  const { device } = useDeviceDetect();

  return (
    <Stack spacing={1} sx={{ width: '100%' }}>
      <Card sx={{ borderRadius: '15px' }}>
        <CardHeader
          title={t('parent.actions.settings')}
          subheader={t('parent.settings.info')}
        />
      </Card>
      <Stack
        spacing={1}
        direction={device === 'desktop' ? 'row' : 'column'}
        sx={{ alignItems: 'start' }}
      >
        <ParentDetailsSettings />
        <AuthSettings />
      </Stack>
    </Stack>
  );
};
