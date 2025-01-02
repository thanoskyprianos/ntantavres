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
  IconButton,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Slider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { AddCircleOutline } from '@mui/icons-material';
import { TFunction } from 'i18next';
import { UserDetails } from '@/types/UserDetails.ts';
import { TabSetter } from '@components/tabs/TabNav.tsx';
import { useParentAds } from '@hooks/useParentAds.hook.ts';
import { useEffect, useState } from 'react';
import { ParentAd, WorkDuration, WorkType } from '@/types/ParentAd.ts';
import { LoadingSpinner } from '@components/LoadingSpinner.tsx';
import { PrivateComponent } from '@components/guard/PrivateComponent.tsx';
import { Switch } from '@components/guard/Switch.tsx';
import { Child } from '@/types/Child.ts';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { removeEmptyFields } from '@util/util.ts';
import { useSnackbarContext } from '@/context/SnackbarProvider.tsx';

interface ParentInfoProps extends UserDetails, TabSetter {
  t: TFunction;
}

// TODO: CRUD
interface ParentAdCardProps extends UserDetails {
  t: TFunction;
}

const ParentAdCard = ({
  t,
  firstName,
  lastName,
  uid,
  city,
}: ParentAdCardProps) => {
  const dispatch = useSnackbarContext();
  const { isLoading, getAd, setAd: setAdF, updateAd } = useParentAds();

  const [ad, setAd] = useState<ParentAd>();

  const [duration, setDuration] = useState<WorkDuration>(1);
  const [type, setType] = useState<WorkType | null>(null);
  const [children, setChildren] = useState<Child[]>([]);
  const [selectedAge, setSelectedAge] = useState<number>(0);
  const [description, setDescription] = useState('');
  const [editOrCreate, setEditOrCreate] = useState(false);

  const [isUpdating, setIsUpdating] = useState(false);

  const handleSubmit = async () => {
    if (!duration || !type || children.length === 0) {
      return;
    }

    setIsUpdating(true);

    const toSave = removeEmptyFields({
      location: city,
      duration,
      type,
      children,
      description,
    }) as unknown as ParentAd;

    try {
      if (!ad) {
        await setAdF(toSave);
      } else {
        await updateAd(toSave);
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
      setIsUpdating(false);
    }
  };

  const handleClear = () => {
    setDuration(ad?.duration || 1);
    setType(ad?.type || null);
    setChildren(ad?.children || []);
    setDescription(ad?.description || '');

    setSelectedAge(0);
  };

  useEffect(() => {
    const get = async () => {
      try {
        const data = await getAd(uid);
        setAd(data as ParentAd);

        setDuration((data as ParentAd).duration);
        setType((data as ParentAd).type);
        setChildren((data as ParentAd).children);
        setDescription((data as ParentAd)?.description || '');
      } catch {
        setAd(undefined);
      }
    };

    get().then();
  }, []);

  return (
    <Card sx={{ borderRadius: '15px', width: '100%' }}>
      <CardHeader title={t('parent.ad.title')} />
      <CardContent>
        {isLoading && <LoadingSpinner />}
        {!isLoading && ad && (
          <Stack sx={{ placeContent: 'center' }}>
            <Typography variant="h6" sx={{ color: 'text.main' }}>
              {t('parent.ad.duration.title')}
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              {ad.duration} {t('parent.ad.duration.months')}
            </Typography>
            <Typography variant="h6" sx={{ color: 'text.main' }}>
              {t('parent.ad.type.title')}
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              {t(`parent.ad.type.${ad.type}`)}
            </Typography>
            <Typography variant="h6" sx={{ color: 'text.main' }}>
              {t('parent.ad.children.title')}
            </Typography>
            <>
              {ad.children.map((child, i) => (
                <Typography
                  variant="body1"
                  sx={{ color: 'text.secondary' }}
                  key={i}
                >
                  {child.age} {t('parent.ad.children.months')}
                </Typography>
              ))}
            </>
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
            a={t('parent.ad.notFound.self')}
            b={t('parent.ad.notFound.others', { firstName, lastName })}
          />
        )}
      </CardContent>
      <PrivateComponent uid={uid}>
        <CardActions>
          <Stack sx={{ width: '100%', placeItems: 'end' }}>
            <Button
              className="edit-button"
              startIcon={ad ? <EditIcon /> : <AddCircleOutline />}
              sx={{ color: ad ? 'secondary.contrastText' : 'success.main' }}
              onClick={() => setEditOrCreate(true)}
            >
              {ad ? t('parent.ad.edit') : t('parent.ad.create')}
            </Button>
          </Stack>
        </CardActions>
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
                {ad ? t('parent.ad.edit') : t('parent.ad.create')}
                <IconButton edge="end" onClick={() => setEditOrCreate(false)}>
                  <CloseIcon />
                </IconButton>
              </Stack>
            </DialogTitle>
            <DialogContent>
              <Stack spacing={2}>
                <InputLabel>
                  {t('parent.ad.duration.title')} (
                  {t('parent.ad.duration.months')})
                </InputLabel>
                <Slider
                  value={duration}
                  onChange={(_e, v) => setDuration(v as WorkDuration)}
                  valueLabelDisplay="auto"
                  min={1}
                  step={1}
                  max={12}
                  marks={Array.from({ length: 12 }).map((_, index) => ({
                    value: index + 1,
                    label: (index + 1).toString(),
                  }))}
                  disabled={isUpdating}
                />
                <Divider flexItem sx={{ paddingTop: '15px' }} />
                <InputLabel>{t('parent.ad.type.title')}</InputLabel>
                <RadioGroup
                  value={type}
                  onChange={(_e, v) => setType(v as WorkType)}
                >
                  <FormControlLabel
                    value="PART_TIME"
                    control={<Radio />}
                    label={t('parent.ad.type.PART_TIME')}
                    disabled={isUpdating}
                  />
                  <FormControlLabel
                    value="FULL_TIME"
                    control={<Radio />}
                    label={t('parent.ad.type.FULL_TIME')}
                    disabled={isUpdating}
                  />
                </RadioGroup>
                <Divider flexItem />
                <InputLabel>{t('parent.ad.children.title')}</InputLabel>
                <Stack
                  spacing={1}
                  sx={{ maxHeight: '150px', overflow: 'auto' }}
                >
                  {children.map(child => (
                    <Stack
                      direction="row"
                      sx={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                      key={child.id}
                    >
                      {child.age} {t('parent.ad.children.months')}
                      <IconButton
                        disabled={isUpdating}
                        onClick={() =>
                          setChildren(childs =>
                            childs.filter(inChild => inChild.id !== child.id)
                          )
                        }
                      >
                        <CloseIcon />
                      </IconButton>
                    </Stack>
                  ))}
                </Stack>
                <Stack direction="row" spacing={1}>
                  <Select
                    variant="outlined"
                    size="small"
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: '200px',
                        },
                      },
                    }}
                    disabled={isUpdating}
                    sx={{ width: '50%' }}
                    value={selectedAge}
                    onChange={e => setSelectedAge(Number(e.target.value))}
                  >
                    {Array.from({ length: 24 }).map((_e, v) => (
                      <MenuItem value={v + 1} key={v + 1}>
                        {v + 1} {t('parent.ad.children.months')}
                      </MenuItem>
                    ))}
                    <MenuItem value={0} sx={{ display: 'none' }} />
                  </Select>
                  <IconButton
                    disabled={!selectedAge || isUpdating}
                    onClick={() =>
                      setChildren(childs => [
                        ...childs,
                        {
                          // TODO: change this some time
                          id: new Date().getTime().toString(),
                          age: selectedAge,
                        } as Child,
                      ])
                    }
                  >
                    <AddIcon />
                  </IconButton>
                </Stack>
                <Divider flexItem />
                <TextField
                  disabled={isUpdating}
                  multiline
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder={t('parent.ad.description')}
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
                {isUpdating ? (
                  <LoadingSpinner size="25px" sx={{ paddingLeft: '30px' }} />
                ) : (
                  // dummy div to make space-between work
                  <div></div>
                )}
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="text"
                    onClick={handleClear}
                    disabled={isUpdating}
                  >
                    {!ad ? t('auth.clear') : t('general.undo')}
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    type="submit"
                    disabled={isUpdating}
                  >
                    {t('general.save')}
                  </Button>
                </Stack>
              </Stack>
            </DialogActions>
          </Card>
        </Dialog>
      </PrivateComponent>
    </Card>
  );
};

const Details = ({
  t,
  address,
  phoneNumber,
  email,
  number,
  city,
  setSelectedTab,
  uid,
}: ParentInfoProps) => {
  const setSearchParams = useSearchParams()[1];

  return (
    <Card
      sx={{
        width: '100%',
        borderRadius: '15px',
      }}
    >
      <CardHeader title={t('parent.info.title')} />
      <CardContent>
        <Typography variant="h6" sx={{ color: 'text.main' }}>
          {t('parent.info.address')}
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          {number && address && city
            ? `${number} ${address} ${city}`
            : t('parent.info.notSet')}
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.main' }}>
          {t('parent.info.phoneNumber')}
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          {phoneNumber || t('parent.info.notSet')}
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.main' }}>
          {t('parent.info.email')}
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
              {t('parent.ad.edit')}
            </Button>
          </Stack>
        </CardActions>
      </PrivateComponent>
    </Card>
  );
};

export const ParentInfo = (props: ParentInfoProps) => {
  const { device } = useDeviceDetect();

  return (
    <Stack
      direction={device !== 'mobile' ? 'row' : 'column'}
      sx={{ width: '100%', alignItems: 'start' }}
      spacing={1}
    >
      <ParentAdCard {...props} />
      <Details {...props} />
    </Stack>
  );
};
