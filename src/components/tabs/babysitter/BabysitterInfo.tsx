import { useDeviceDetect } from '@hooks/useDeviceDetect.hook.ts';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid2,
  Stack,
  Typography,
} from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { PrivateComponent } from '@components/guard/PrivateComponent.tsx';
import { useProfileContext } from '@/context/ProfileProvider.tsx';
import { useTranslation } from 'react-i18next';
import { useTabSetterContext } from '@/context/TabSetterProvider.tsx';
import { useEffect, useState } from 'react';
import { useBabysitter } from '@hooks/useBabysitter.hook.ts';
import {
  allMonthsUnavailable,
  MonthAvailability,
} from '@/types/MonthAvailability.ts';
import { useSnackbarContext } from '@/context/SnackbarProvider.tsx';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { LoadingSpinner } from '@components/LoadingSpinner.tsx';

const BabysitterCalendar = () => {
  const { t } = useTranslation();
  const { uid } = useProfileContext();
  const dispatch = useSnackbarContext();

  const [edit, setEdit] = useState(false);
  const { getAvailability, setAvailability, isLoading } = useBabysitter();
  const [availabilityLocal, setAvailabilityLocal] = useState<MonthAvailability>(
    () => allMonthsUnavailable
  );

  useEffect(() => {
    const fetch = async () => {
      const avail = await getAvailability(uid);

      setAvailabilityLocal(old => ({ ...old, ...avail }));
    };

    fetch().then();
  }, []);

  const handleSubmit = async () => {
    try {
      await setAvailability(uid, availabilityLocal);

      dispatch!({
        type: 'success',
        payload: { message: t('babysitter.calendar.success.set') },
      });
    } catch {
      dispatch!({
        type: 'error',
        payload: { message: t('babysitter.calendar.error.set') },
      });
    }

    setEdit(false);
  };

  return (
    <Card
      sx={{
        width: '100%',
        borderRadius: '15px',
      }}
    >
      <CardHeader title={t('babysitter.calendar.title')} />
      <CardContent>
        <Grid2 container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
          {Object.entries(
            t('babysitter.calendar.months', { returnObjects: true })
          ).map(([key, value]) => (
            <Grid2 key={key} size={{ xs: 2, sm: 4, md: 4 }}>
              <Button
                variant="outlined"
                sx={{
                  color: availabilityLocal[key as keyof MonthAvailability]
                    ? 'success.main'
                    : 'dimgrey',
                  width: '100%',
                  overflow: 'hidden',
                }}
                disabled={
                  isLoading ||
                  (!edit && !availabilityLocal[key as keyof MonthAvailability])
                }
                onClick={() => {
                  if (edit) {
                    setAvailabilityLocal(prev => ({
                      ...prev,
                      [key as keyof MonthAvailability]:
                        !prev[key as keyof MonthAvailability],
                    }));
                  }
                }}
              >
                {value}
              </Button>
            </Grid2>
          ))}
        </Grid2>
      </CardContent>
      <PrivateComponent uid={uid}>
        <CardActions>
          <Stack
            direction="row"
            sx={{
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            {isLoading ? (
              <LoadingSpinner size="25px" sx={{ paddingLeft: '30px' }} />
            ) : (
              // dummy div to make space-between work
              <div></div>
            )}
            {edit ? (
              <Button
                startIcon={<DoneAllIcon />}
                sx={{ color: 'secondary.contrastText' }}
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {t('general.submit')}
              </Button>
            ) : (
              <Button
                startIcon={<EditIcon />}
                sx={{ color: 'secondary.contrastText' }}
                onClick={() => setEdit(edit => !edit)}
                disabled={isLoading}
              >
                {t('general.edit')}
              </Button>
            )}
          </Stack>
        </CardActions>
      </PrivateComponent>
    </Card>
  );
};

const Details = () => {
  const setSearchParams = useSearchParams()[1];

  const { uid, phoneNumber, email, location } = useProfileContext();
  const { setSelectedTab } = useTabSetterContext();
  const { t } = useTranslation();

  return (
    <Card
      sx={{
        width: '100%',
        borderRadius: '15px',
      }}
    >
      <CardHeader title={t('babysitter.info.title')} />
      <CardContent>
        <Typography variant="h6" sx={{ color: 'text.main' }}>
          {t('babysitter.info.address')}
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          {location && location.number && location.address && location.city
            ? `${location.number} ${location.address} ${location.city}`
            : t('babysitter.info.notSet')}
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.main' }}>
          {t('babysitter.info.phoneNumber')}
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          {phoneNumber || t('babysitter.info.notSet')}
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.main' }}>
          {t('babysitter.info.email')}
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          {email}
        </Typography>
      </CardContent>

      <PrivateComponent uid={uid}>
        <CardActions>
          <Stack sx={{ placeItems: 'end', width: '100%' }}>
            <Button
              startIcon={<EditIcon />}
              sx={{ color: 'secondary.contrastText' }}
              onClick={() => {
                setSelectedTab('settings');
                setSearchParams(prev => {
                  prev.set('tab', 'settings');
                  return prev;
                });
              }}
            >
              {t('general.edit')}
            </Button>
          </Stack>
        </CardActions>
      </PrivateComponent>
    </Card>
  );
};

export const BabysitterInfo = () => {
  const { device } = useDeviceDetect();

  return (
    <Stack
      direction={device !== 'mobile' ? 'row' : 'column'}
      sx={{ width: '100%', alignItems: 'start' }}
      spacing={1}
    >
      <Details />
      <BabysitterCalendar />
    </Stack>
  );
};
