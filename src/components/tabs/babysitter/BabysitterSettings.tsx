import { useTranslation } from 'react-i18next';
import { useDeviceDetect } from '@hooks/useDeviceDetect.hook.ts';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from '@mui/material';
import { DetailsSettings } from '@components/tabs/common/settings/DetailsSettings.tsx';
import { AuthSettings } from '@components/tabs/common/settings/AuthSettings.tsx';
import { TextFieldSmall } from '@components/util/TextFieldSmall.tsx';
import { useEffect, useState } from 'react';
import { BabysitterTraits, Gender } from '@/types/BabysitterTypes.ts';
import { useBabysitter } from '@hooks/useBabysitter.hook.ts';
import { useProfileContext } from '@/context/ProfileProvider.tsx';
import { LoadingSpinner } from '@components/LoadingSpinner.tsx';
import { useSnackbarContext } from '@/context/SnackbarProvider.tsx';
import { isEmpty } from '@util/util.ts';

const BabysitterTraitsSettings = () => {
  const { t } = useTranslation();
  const { uid } = useProfileContext();
  const dispatch = useSnackbarContext();

  const [traits, setTraits] = useState<BabysitterTraits>();
  const [localTraits, setLocalTraits] = useState<BabysitterTraits>();
  const { getTraits, setTraits: setTraitsF, isLoading } = useBabysitter();
  const [gender, setGender] = useState('');

  useEffect(() => {
    setLocalTraits(prev => ({ ...prev, gender: gender as Gender }));
  }, [gender]);

  useEffect(() => {
    const fetch = async () => {
      const data = await getTraits(uid);
      setTraits(data);
      setLocalTraits(data);
      setGender(data?.gender || '');
    };

    fetch().then();
  }, []);

  const handleSubmit = async () => {
    if (!localTraits || isEmpty(localTraits)) {
      return;
    }

    try {
      await setTraitsF(uid, { ...traits, ...localTraits });

      dispatch!({
        type: 'success',
        payload: {
          message: `${t('babysitter.settings.success.traits')}. ${t('general.reloading')}`,
        },
      });

      setTimeout(() => window.location.reload(), 2000);
    } catch {
      dispatch!({
        type: 'error',
        payload: { message: t('babysitter.settings.error.traits') },
      });
    }
  };

  const handleClear = () => {
    setLocalTraits(traits);
  };

  return (
    <Card sx={{ borderRadius: '15px', width: '100%' }}>
      <CardHeader title={t('babysitter.settings.traits')} />
      <CardContent>
        <Stack spacing={1.5}>
          <InputLabel>{t('babysitter.info.gender')}</InputLabel>
          <Select
            value={gender}
            onChange={e => setGender(e.target.value as Gender)}
            variant="outlined"
          >
            {Object.entries(t('general.gender', { returnObjects: true })).map(
              ([key, value]) => (
                <MenuItem key={key} value={key}>
                  {value}
                </MenuItem>
              )
            )}
            <MenuItem sx={{ display: 'none' }} />
          </Select>
          <TextFieldSmall
            label={t('babysitter.info.experience')}
            slotProps={{
              inputLabel: {
                shrink: !!localTraits?.experience || !!traits?.experience,
              },
            }}
            value={localTraits?.experience}
            onChange={e =>
              setLocalTraits(prev => ({ ...prev, experience: e.target.value }))
            }
            disabled={isLoading}
            multiline
            rows={3}
          />
          <TextFieldSmall
            label={t('babysitter.info.studies')}
            slotProps={{
              inputLabel: {
                shrink: !!localTraits?.studies || !!traits?.studies,
              },
            }}
            value={localTraits?.studies}
            onChange={e =>
              setLocalTraits(prev => ({ ...prev, studies: e.target.value }))
            }
            disabled={isLoading}
            multiline
            rows={3}
          />
          <TextFieldSmall
            label={t('babysitter.info.about')}
            slotProps={{
              inputLabel: { shrink: !!localTraits?.about || !!traits?.about },
            }}
            value={localTraits?.about}
            onChange={e =>
              setLocalTraits(prev => ({ ...prev, about: e.target.value }))
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
          <BabysitterTraitsSettings />
        </Stack>
        <AuthSettings />
      </Stack>
    </Stack>
  );
};
