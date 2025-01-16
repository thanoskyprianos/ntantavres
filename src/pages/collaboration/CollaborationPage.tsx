import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Collaboration, CollaborationState } from '@/types/Collaboration.ts';
import { useCollaboration } from '@hooks/useCollaboration.hook.ts';
import { LoadingSpinner } from '@components/LoadingSpinner.tsx';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from '@/context/AuthProvider.tsx';
import { useUserDetails } from '@hooks/useUserDetails.hook.ts';
import { Location, UserDetails } from '@/types/UserDetails.ts';
import { Base64String } from '@/types/Avatar.ts';
import { AvatarDisplay } from '@components/util/AvatarDisplay.tsx';
import { MonthAvailability } from '@/types/MonthAvailability.ts';
import { useBabysitter } from '@hooks/useBabysitter.hook.ts';
import { WorkType } from '@/types/ParentAd.ts';
import { monthSort } from '@util/util.ts';
import { useSnackbarContext } from '@/context/SnackbarProvider.tsx';

export const CollaborationPage = () => {
  const { t } = useTranslation();
  const { cid } = useParams();
  const { user, details } = useAuthContext();
  const { getUserDetails, getUserAvatar } = useUserDetails();
  const navigate = useNavigate();
  const dispatch = useSnackbarContext();

  const [isLoading, setIsLoading] = useState(false);
  const [collaboration, setCollaboration] = useState<Collaboration>();

  const [parent, setParent] = useState<UserDetails | null>(null);
  const [babysitter, setBabysitter] = useState<UserDetails | null>(null);
  const [availability, setAvailability] = useState<MonthAvailability | null>(
    null
  );

  // final
  const [location, setLocation] = useState<Location | null>(null);
  const [locationStr, setLocationStr] = useState<
    'parent' | 'babysitter' | null
  >(null);

  useEffect(() => {
    if (!collaboration) {
      return;
    }

    if (
      locationStr === 'parent' ||
      collaboration.babysitterAd?.location === 'parent'
    ) {
      setLocation(collaboration.parentAd?.location || null);
    } else if (
      locationStr === 'babysitter' &&
      collaboration.babysitterAd?.location !== 'parentHome'
    ) {
      setLocation(collaboration.babysitterAd?.location || null);
    }
  }, [locationStr]);

  const [type, setType] = useState<WorkType | null>(null);
  const [month, setMonth] = useState<keyof MonthAvailability | null>(null);

  const [parentAvatar, setParentAvatar] = useState<Base64String | null>(null);
  const [babysitterAvatar, setBabysitterAvatar] = useState<Base64String | null>(
    null
  );

  const {
    isLoading: isUpdating,
    getCollaboration,
    updateCollaboration,
  } = useCollaboration();
  const { getAvailability } = useBabysitter();

  const handleSignParent = async () => {
    if (!collaboration || !collaboration.collaborationId) {
      return;
    }

    try {
      await updateCollaboration(collaboration.collaborationId, {
        parentSignature: true,
      });
      dispatch!({
        type: 'success',
        payload: {
          message: `${t('collaboration.edit.sign.success')}. ${t('general.reloading')}`,
        },
      });
      setTimeout(() => window.location.reload(), 2000);
    } catch {
      dispatch!({
        type: 'error',
        payload: { message: t('collaboration.edit.sign.error') },
      });
    }
  };

  const handleSignBabysitter = async () => {
    if (!collaboration || !collaboration.collaborationId) {
      return;
    }

    try {
      await updateCollaboration(collaboration.collaborationId, {
        babysitterSignature: true,
      });
      dispatch!({
        type: 'success',
        payload: {
          message: `${t('collaboration.edit.sign.success')}. ${t('general.reloading')}`,
        },
      });
      setTimeout(() => window.location.reload(), 2000);
    } catch {
      dispatch!({
        type: 'error',
        payload: { message: t('collaboration.edit.sign.error') },
      });
    }
  };

  useEffect(() => {
    if (!user || !details) {
      return;
    }

    if (!cid) {
      navigate('/404');
      return;
    }

    const fetch = async () => {
      setIsLoading(true);

      const collab = await getCollaboration(cid);
      if (!collab || !collab.puid || !collab.buid) {
        navigate('/404');
        return;
      }

      let parent: UserDetails;
      let babysitter: UserDetails;

      if (collab.puid === user?.uid) {
        parent = details;
        babysitter = await getUserDetails(collab.buid);
      } else {
        parent = await getUserDetails(collab.puid);
        babysitter = details;
      }

      const availability = await getAvailability(collab.buid);
      const parentAvatar = await getUserAvatar(collab.puid);
      const babysitterAvatar = await getUserAvatar(collab.buid);

      setParent(parent);
      setBabysitter(babysitter);
      setAvailability(availability);
      setParentAvatar(parentAvatar || null);
      setBabysitterAvatar(babysitterAvatar || null);
      setCollaboration(collab);

      setLocation(collab.location || null);
      setType(collab.type || null);
      setMonth(
        collab.currentMonth || collab.appointment?.interestedFor || null
      );

      if (collab.location && collab.parentAd && collab.babysitterAd) {
        if (
          collab.location.number === collab.parentAd?.location.number &&
          collab.location.address === collab.parentAd?.location.address &&
          collab.location.city === collab.parentAd?.location.city
        ) {
          setLocationStr('parent');
        } else if (collab.babysitterAd.location !== 'parentHome') {
          setLocationStr('babysitter');
        }
      }

      setIsLoading(false);
    };

    fetch().then();
  }, [cid, user, details]);

  return isLoading ||
    !collaboration ||
    !parent ||
    !babysitter ||
    !availability ? (
    <LoadingSpinner />
  ) : (
    <Stack sx={{ placeItems: 'center' }} spacing={1}>
      <Card sx={{ borderRadius: '15px', width: '95%', maxWidth: '500px' }}>
        <Stack direction={'row'} sx={{ justifyContent: 'space-between' }}>
          <CardHeader
            avatar={
              <AvatarDisplay
                avatar={parentAvatar || undefined}
                sx={{ width: '50px', height: '50px' }}
              >
                <Typography variant="h3">
                  {parent.firstName &&
                    parent.lastName &&
                    parent.firstName.charAt(0).toUpperCase() +
                      parent.lastName.charAt(0).toUpperCase()}
                </Typography>
              </AvatarDisplay>
            }
            title={`${parent.firstName} ${parent.lastName}`}
            subheader={
              collaboration.parentSignature
                ? t('collaboration.edit.signed')
                : t('collaboration.edit.notSigned')
            }
          />
          <CardHeader
            avatar={
              <AvatarDisplay
                avatar={babysitterAvatar || undefined}
                sx={{ width: '50px', height: '50px' }}
              >
                <Typography variant="h3">
                  {babysitter.firstName &&
                    babysitter.lastName &&
                    babysitter.firstName.charAt(0).toUpperCase() +
                      babysitter.lastName.charAt(0).toUpperCase()}
                </Typography>
              </AvatarDisplay>
            }
            title={`${babysitter.firstName} ${babysitter.lastName}`}
            subheader={
              collaboration.babysitterSignature
                ? t('collaboration.edit.signed')
                : t('collaboration.edit.notSigned')
            }
          />
        </Stack>
        <CardContent>
          {collaboration.state === CollaborationState.TEMPORARY && (
            <Stack sx={{ placeItems: 'center' }} spacing={1}>
              <InputLabel>{t('babysitter.ad.location.title')}</InputLabel>
              <ToggleButtonGroup
                exclusive
                value={locationStr}
                onChange={(_e, v) => v !== null && setLocationStr(v)}
                sx={{ width: '100%' }}
                disabled={
                  (details?.role === 'PARENT' &&
                    collaboration.parentSignature) ||
                  (details?.role === 'BABYSITTER' &&
                    collaboration.babysitterSignature)
                }
              >
                <ToggleButton
                  value="parent"
                  sx={{ textTransform: 'none', width: '100%' }}
                >
                  {collaboration.parentAd?.location.number}{' '}
                  {collaboration.parentAd?.location.address}{' '}
                  {collaboration.parentAd?.location.city}
                </ToggleButton>
                {collaboration.babysitterAd?.location !== 'parentHome' && (
                  <ToggleButton
                    value="babysitter"
                    sx={{ textTransform: 'none', width: '100%' }}
                  >
                    {collaboration.babysitterAd?.location!.number}{' '}
                    {collaboration.babysitterAd?.location!.address}{' '}
                    {collaboration.babysitterAd?.location!.city}
                  </ToggleButton>
                )}
              </ToggleButtonGroup>

              <InputLabel>{t('babysitter.ad.type.title')}</InputLabel>
              <ToggleButtonGroup
                exclusive
                value={type}
                onChange={(_e, v) => v !== null && setType(v)}
                sx={{ width: '100%' }}
              >
                <ToggleButton
                  value="PART_TIME"
                  sx={{ textTransform: 'none', width: '100%' }}
                >
                  {t('babysitter.ad.type.PART_TIME')}
                </ToggleButton>
                {collaboration.babysitterAd?.location !== 'parentHome' && (
                  <ToggleButton
                    value="FULL_TIME"
                    sx={{ textTransform: 'none', width: '100%' }}
                  >
                    {t('babysitter.ad.type.FULL_TIME')}
                  </ToggleButton>
                )}
              </ToggleButtonGroup>

              <InputLabel>
                {t('babysitter.calendar.meeting.interested.title')}
              </InputLabel>
              <Select
                variant="outlined"
                value={month}
                onChange={e =>
                  setMonth(e.target.value as keyof MonthAvailability)
                }
                sx={{ width: '100%' }}
                size="small"
              >
                {Object.entries(availability)
                  .sort(
                    (a, b) =>
                      monthSort(a[0] as keyof MonthAvailability) -
                      monthSort(b[0] as keyof MonthAvailability)
                  )
                  .map(([key, value]) => (
                    <MenuItem key={key} value={key} disabled={!value}>
                      {t(`babysitter.calendar.months.${key}`)}
                    </MenuItem>
                  ))}
              </Select>
            </Stack>
          )}
        </CardContent>
      </Card>
      <Stack
        direction="row"
        sx={{
          justifyContent: 'space-between',
          width: '95%',
          maxWidth: '500px',
        }}
      >
        {collaboration.state === CollaborationState.TEMPORARY && (
          <Button
            variant="contained"
            disabled={
              isUpdating ||
              details?.role !== 'PARENT' ||
              collaboration.parentSignature
            }
            sx={{ borderRadius: '15px' }}
            size="large"
            onClick={handleSignParent}
          >
            {collaboration.parentSignature
              ? t('collaboration.sign.done')
              : t('collaboration.sign.do')}
          </Button>
        )}
        {collaboration.state === CollaborationState.TEMPORARY && (
          <Button
            variant="contained"
            disabled={isUpdating || details?.role !== 'BABYSITTER'}
            sx={{ borderRadius: '15px' }}
            size="large"
            onClick={handleSignBabysitter}
          >
            {collaboration.babysitterSignature
              ? t('collaboration.sign.done')
              : t('collaboration.sign.do')}
          </Button>
        )}
      </Stack>
    </Stack>
  );
};
