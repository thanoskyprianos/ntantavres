import { useTranslation } from 'react-i18next';
import { useDeviceDetect } from '@hooks/useDeviceDetect.hook.ts';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Stack,
} from '@mui/material';
import { DetailsSettings } from '@components/tabs/common/settings/DetailsSettings.tsx';
import { AuthSettings } from '@components/tabs/common/settings/AuthSettings.tsx';
import { TextFieldSmall } from '@components/util/TextFieldSmall.tsx';
import { useEffect, useState } from 'react';
import { BabysitterAd } from '@/types/BabysitterAd.ts';
import { useBabysitter } from '@hooks/useBabysitter.hook.ts';
import { useProfileContext } from '@/context/ProfileProvider.tsx';
import { LoadingSpinner } from '@components/LoadingSpinner.tsx';
import { useSnackbarContext } from '@/context/SnackbarProvider.tsx';
import { isEmpty } from '@util/util.ts';

const BabysitterAdSettings = () => {
  const { t } = useTranslation();
  const { uid } = useProfileContext();
  const dispatch = useSnackbarContext();

  const [ad, setAd] = useState<BabysitterAd>();
  const [localAd, setLocalAd] = useState<BabysitterAd>();
  const { getAd, setAd: setAdF, isLoading } = useBabysitter();

  useEffect(() => {
    const fetch = async () => {
      const data = await getAd(uid);
      setAd(data);
      setLocalAd(data);
    };

    fetch().then();
  }, []);

  const handleSubmit = async () => {
    if (!localAd || isEmpty(localAd)) {
      return;
    }

    try {
      await setAdF(uid, { ...ad, ...localAd });

      dispatch!({
        type: 'success',
        payload: {
          message: `${t('babysitter.settings.success.ad')}. ${t('general.reloading')}`,
        },
      });

      setTimeout(() => window.location.reload(), 2000);
    } catch {
      dispatch!({
        type: 'error',
        payload: { message: t('babysitter.settings.error.ad') },
      });
    }
  };

  const handleClear = () => {
    setLocalAd(ad);
  };

  return (
    <Card sx={{ borderRadius: '15px', width: '100%' }}>
      <CardHeader title={t('babysitter.settings.ad')} />
      <CardContent>
        <Stack spacing={1.5}>
          <TextFieldSmall
            label={t('babysitter.info.experience')}
            slotProps={{
              inputLabel: { shrink: !!localAd?.experience || !!ad?.experience },
            }}
            value={localAd?.experience}
            onChange={e =>
              setLocalAd(prev => ({ ...prev, experience: e.target.value }))
            }
            disabled={isLoading}
            multiline
            rows={3}
          />
          <TextFieldSmall
            label={t('babysitter.info.studies')}
            slotProps={{
              inputLabel: { shrink: !!localAd?.studies || !!ad?.studies },
            }}
            value={localAd?.studies}
            onChange={e =>
              setLocalAd(prev => ({ ...prev, studies: e.target.value }))
            }
            disabled={isLoading}
            multiline
            rows={3}
          />
          <TextFieldSmall
            label={t('babysitter.info.about')}
            slotProps={{
              inputLabel: { shrink: !!localAd?.about || !!ad?.about },
            }}
            value={localAd?.about}
            onChange={e =>
              setLocalAd(prev => ({ ...prev, about: e.target.value }))
            }
            disabled={isLoading}
            multiline
            rows={3}
          />
        </Stack>
      </CardContent>
      <CardActions>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            padding: '0 15px 15px 15px',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          {isLoading ? (
            <LoadingSpinner size="25px" sx={{ paddingLeft: '30px' }} />
          ) : (
            // dummy div to make space-between work
            <div></div>
          )}
          <Stack direction="row" spacing={2}>
            <Button variant="text" onClick={handleClear} disabled={isLoading}>
              {t('general.undo')}
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              type="submit"
              disabled={isLoading}
            >
              {t('general.update')}
            </Button>
          </Stack>
        </Stack>
      </CardActions>
    </Card>
  );
};

export const BabysitterSettings = () => {
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
        <Stack sx={{ width: '100%' }} spacing={1}>
          <DetailsSettings />
          <BabysitterAdSettings />
        </Stack>
        <AuthSettings />
      </Stack>
    </Stack>
  );
};
