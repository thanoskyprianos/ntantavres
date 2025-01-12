import { useDeviceDetect } from '@hooks/useDeviceDetect.hook.ts';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  Grid2,
  IconButton,
  InputLabel,
  Link,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
  useTheme,
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
import { BabysitterAd, BabysitterTraits } from '@/types/BabysitterTypes.ts';
import { Switch } from '@components/guard/Switch.tsx';
import { useAuthContext } from '@/context/AuthProvider.tsx';
import { WorkType } from '@/types/ParentAd.ts';
import { AddCircleOutline, WarningAmber } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { isEmpty, removeEmptyFields } from '@util/util.ts';

const BabysitterCalendar = () => {
  const { t } = useTranslation();
  const { uid } = useProfileContext();
  const { user } = useAuthContext();
  const dispatch = useSnackbarContext();
  const theme = useTheme().palette.mode;

  const [edit, setEdit] = useState(false);
  const [final, setFinal] = useState<boolean>();
  const { getAd } = useBabysitter();
  const { getAvailability, setAvailability, isLoading } = useBabysitter();
  const [availabilityLocal, setAvailabilityLocal] = useState<MonthAvailability>(
    () => allMonthsUnavailable
  );

  useEffect(() => {
    const fetch = async () => {
      const avail = await getAvailability(uid);
      const data = await getAd(uid);

      setAvailabilityLocal(old => ({ ...old, ...avail }));
      setFinal(data?.final || false);
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

  const handleClick = (key: string) => {
    if (edit) {
      setAvailabilityLocal(prev => ({
        ...prev,
        [key as keyof MonthAvailability]: !prev[key as keyof MonthAvailability],
      }));
    } else {
      if (uid === user?.uid) {
        dispatch!({
          type: 'info',
          payload: { message: t('babysitter.calendar.clickMonth.self') },
        });
      } else {
        // goto appointment scheduling
      }
    }
  };

  return (
    <Card
      sx={{
        width: '100%',
        borderRadius: '15px',
      }}
    >
      <CardHeader
        title={t('babysitter.calendar.title')}
        subheader={
          <Switch
            uid={uid}
            a={!final ? t('babysitter.calendar.subheader.self') : ''}
            b={t('babysitter.calendar.subheader.others')}
          />
        }
      />
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
                    : theme === 'dark'
                      ? 'dimgrey'
                      : 'lightgray',
                  width: '100%',
                  overflow: 'hidden',
                }}
                disabled={
                  isLoading ||
                  (!edit && !availabilityLocal[key as keyof MonthAvailability])
                }
                onClick={() => handleClick(key)}
              >
                {value}
              </Button>
            </Grid2>
          ))}
        </Grid2>
      </CardContent>
      <PrivateComponent uid={uid}>
        {final === false && (
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
        )}
      </PrivateComponent>
    </Card>
  );
};

const Details = () => {
  const setSearchParams = useSearchParams()[1];

  const { uid, phoneNumber, email, location } = useProfileContext();
  const { setSelectedTab } = useTabSetterContext();
  const { t } = useTranslation();
  const [traits, setTraits] = useState<BabysitterTraits>();

  const { getTraits } = useBabysitter();

  useEffect(() => {
    const fetch = async () => {
      const data = await getTraits(uid);
      setTraits(data);
    };

    fetch().then();
  }, []);

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
        {phoneNumber ? (
          <Link href={`tel:${phoneNumber}`} sx={{ display: 'inline-block' }}>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              {phoneNumber || t('babysitter.info.notSet')}
            </Typography>
          </Link>
        ) : (
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            {phoneNumber || t('babysitter.info.notSet')}
          </Typography>
        )}
        <Typography variant="h6" sx={{ color: 'text.main' }}>
          {t('babysitter.info.email')}
        </Typography>
        <Link href={`mailto:${email}`} sx={{ display: 'inline-block' }}>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            {email}
          </Typography>
        </Link>

        <Divider flexItem sx={{ margin: '5px 0' }} />

        <Typography variant="h6" sx={{ color: 'text.main' }}>
          {t('babysitter.info.experience')}
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          {traits?.experience || t('babysitter.info.notSet')}
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.main' }}>
          {t('babysitter.info.studies')}
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          {traits?.studies || t('babysitter.info.notSet')}
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.main' }}>
          {t('babysitter.info.about')}
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          {traits?.about || t('babysitter.info.notSet')}
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

const BabysitterAdCard = () => {
  const dispatch = useSnackbarContext();
  const { firstName, lastName, uid, location } = useProfileContext();
  const { t } = useTranslation();

  const { getAd, setAd: setAdF, updateAd } = useBabysitter();
  const [ad, setAd] = useState<BabysitterAd>();
  const [localAd, setLocalAd] = useState<BabysitterAd>();
  const [isLoading, setIsLoading] = useState(false);
  const [editOrCreate, setEditOrCreate] = useState(false);
  const [finalizeDialog, setFinalizeDialog] = useState(false);

  // for some reason we get error when directly changing localAd
  const [locationStr, setLocationStr] = useState('');
  const [typeStr, setTypeStr] = useState('');

  useEffect(() => {
    setLocalAd(prev => ({
      ...prev,
      location: locationStr === 'parentHome' ? 'parentHome' : location,
    }));
  }, [locationStr]);

  useEffect(() => {
    if (typeStr !== 'PART_TIME' && typeStr !== 'FULL_TIME') {
      return;
    }

    setLocalAd(prev => ({ ...prev, type: typeStr }));
  }, [typeStr]);

  const handleSubmit = async () => {
    const toSave = removeEmptyFields(localAd);
    if (isEmpty(toSave)) {
      return;
    }

    setIsLoading(true);

    try {
      if (!ad) {
        await setAdF(uid, localAd || {});
      } else {
        await updateAd(uid, localAd || {});
      }
      handleClear();
      dispatch!({
        type: 'success',
        payload: {
          message: `${t('parent.settings.success')}. ${t('general.reloading')}`,
        },
      });

      setTimeout(() => window.location.reload(), 2000);
    } catch {
      dispatch!({ type: 'error', payload: { message: t('error.generic') } });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setLocalAd(ad);
  };

  const handleFinalize = async () => {
    setIsLoading(true);

    try {
      await updateAd(uid, { final: true });
      dispatch!({
        type: 'success',
        payload: {
          message: `${t('babysitter.ad.final.success')}. ${t('general.reloading')}`,
        },
      });
      setTimeout(() => window.location.reload(), 2000);
    } catch {
      dispatch!({
        type: 'error',
        payload: { message: t('babysitter.ad.final.error') },
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      const data = await getAd(uid);

      setAd(data);
      setLocalAd(data);
      setLocationStr(data?.location !== 'parentHome' ? 'self' : 'parentHome');
      setTypeStr(data?.type || '');

      setIsLoading(false);
    };

    fetch().then();
  }, []);

  return (
    <Card sx={{ borderRadius: '15px', width: '100%' }}>
      <CardHeader title={t('babysitter.ad.title')} />
      <CardContent>
        {isLoading && <LoadingSpinner />}
        {!isLoading && ad && (
          <Stack sx={{ placeContent: 'center' }}>
            <Typography variant="h6" sx={{ color: 'text.main' }}>
              {t('babysitter.ad.location.title')}
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              {ad?.location === 'parentHome'
                ? t('babysitter.ad.location.parentHome')
                : `${ad.location?.number} ${ad.location?.address} ${ad.location?.city}`}
            </Typography>
            <Typography variant="h6" sx={{ color: 'text.main' }}>
              {t('babysitter.ad.type.title')}
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              {t(`babysitter.ad.type.${ad.type}`)}
            </Typography>
            <Typography variant="h6" sx={{ color: 'text.main' }}>
              {t('parent.ad.description')}
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              {ad.description || t('parent.info.notSet')}
            </Typography>
          </Stack>
        )}
        {!isLoading && !ad && (
          <Switch
            uid={uid}
            a={t('babysitter.ad.notFound.self')}
            b={t('babysitter.ad.notFound.others', { firstName, lastName })}
          />
        )}
      </CardContent>
      <PrivateComponent uid={uid}>
        {ad && !ad.final && (
          <CardActions>
            <Stack
              sx={{ width: '100%', placeContent: 'end' }}
              direction="row"
              spacing={1}
            >
              {ad && (
                <Button
                  startIcon={<DoneAllIcon />}
                  sx={{ color: 'success.main' }}
                  onClick={() => setFinalizeDialog(true)}
                >
                  {t('babysitter.ad.final.title')}
                </Button>
              )}
              <Button
                startIcon={ad ? <EditIcon /> : <AddCircleOutline />}
                sx={{ color: ad ? 'secondary.contrastText' : 'success.main' }}
                onClick={() => setEditOrCreate(true)}
              >
                {ad ? t('general.edit') : t('parent.ad.create')}
              </Button>
            </Stack>
          </CardActions>
        )}
        <Dialog
          open={editOrCreate}
          PaperProps={{ style: { borderRadius: '15px' } }}
          fullWidth
        >
          <Card sx={{ padding: '0 5px 5px 5px', overflow: 'auto' }}>
            <DialogTitle>
              <Stack
                direction="row"
                sx={{ justifyContent: 'space-between', alignItems: 'center' }}
              >
                {ad ? t('general.edit') : t('babysitter.ad.create')}
                <IconButton edge="end" onClick={() => setEditOrCreate(false)}>
                  <CloseIcon />
                </IconButton>
              </Stack>
            </DialogTitle>
            <DialogContent>
              <Stack spacing={2}>
                <InputLabel>{t('babysitter.ad.location.title')}</InputLabel>
                <RadioGroup
                  value={locationStr}
                  onChange={(_e, v) => setLocationStr(v)}
                >
                  <FormControlLabel
                    value="self"
                    control={<Radio />}
                    label={t('babysitter.ad.location.self')}
                    disabled={isLoading}
                  />
                  <FormControlLabel
                    value="parentHome"
                    control={<Radio />}
                    label={t('babysitter.ad.location.parentHome')}
                    disabled={isLoading}
                  />
                </RadioGroup>
                <Divider flexItem />
                <InputLabel>{t('babysitter.ad.type.title')}</InputLabel>
                <RadioGroup
                  value={typeStr}
                  onChange={(_e, v) => setTypeStr(v as WorkType)}
                >
                  <FormControlLabel
                    value="PART_TIME"
                    control={<Radio />}
                    label={t('parent.ad.type.PART_TIME')}
                    disabled={isLoading}
                  />
                  <FormControlLabel
                    value="FULL_TIME"
                    control={<Radio />}
                    label={t('parent.ad.type.FULL_TIME')}
                    disabled={isLoading}
                  />
                </RadioGroup>
                <Divider flexItem />
                <TextField
                  disabled={isLoading}
                  multiline
                  value={localAd?.description}
                  onChange={e =>
                    setLocalAd(prev => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  label={t('parent.ad.description')}
                  rows={3}
                />
              </Stack>
            </DialogContent>
            <DialogActions>
              <Stack
                direction="row"
                sx={{
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
                  <Button
                    variant="text"
                    onClick={handleClear}
                    disabled={isLoading}
                  >
                    {!ad ? t('auth.clear') : t('general.undo')}
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    type="submit"
                    disabled={isLoading}
                  >
                    {t('general.save')}
                  </Button>
                </Stack>
              </Stack>
            </DialogActions>
          </Card>
        </Dialog>
        <Dialog
          open={finalizeDialog}
          PaperProps={{ style: { borderRadius: '15px' } }}
          fullWidth
        >
          <Card sx={{ padding: '0 5px 5px 5px', overflow: 'auto' }}>
            <DialogTitle>
              <Stack
                direction="row"
                sx={{ justifyContent: 'space-between', alignItems: 'center' }}
              >
                <Stack
                  direction="row"
                  sx={{ alignItems: 'center' }}
                  spacing={1}
                >
                  <WarningAmber />
                  <Typography variant="h6">
                    {t('babysitter.ad.final.title')}
                  </Typography>
                </Stack>
                <IconButton edge="end" onClick={() => setFinalizeDialog(false)}>
                  <CloseIcon />
                </IconButton>
              </Stack>
            </DialogTitle>
            <DialogContent>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                {t('babysitter.ad.final.prompt1')} <br /> <br />
                {t('babysitter.ad.final.prompt2')}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button sx={{ color: 'success.main' }} onClick={handleFinalize}>
                {t('general.submit')}
              </Button>
            </DialogActions>
          </Card>
        </Dialog>
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
      <Stack spacing={1} sx={{ width: '100%' }}>
        <BabysitterAdCard />
        <BabysitterCalendar />
      </Stack>
      <Details />
    </Stack>
  );
};
