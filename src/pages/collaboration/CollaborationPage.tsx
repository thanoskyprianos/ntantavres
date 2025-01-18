import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Collaboration, CollaborationState } from '@/types/Collaboration.ts';
import { useCollaboration } from '@hooks/useCollaboration.hook.ts';
import { LoadingSpinner } from '@components/LoadingSpinner.tsx';
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
  IconButton,
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
import { useMeeting } from '@hooks/useMeeting.hook.ts';
import {
  Cancel,
  CheckCircleOutline,
  Draw,
  Payment,
  Save,
  WarningAmber,
} from '@mui/icons-material';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CloseIcon from '@mui/icons-material/Close';
import { MeetingState } from '@/types/Meeting.ts';

export const CollaborationPage = () => {
  const { t } = useTranslation();
  const { cid } = useParams();
  const { user, details } = useAuthContext();
  const { getUserDetails, getUserAvatar } = useUserDetails();
  const { isLoading: isPaying, doPayment } = useCollaboration();
  const { updateMeeting } = useMeeting();
  const navigate = useNavigate();
  const dispatch = useSnackbarContext();

  const [isLoading, setIsLoading] = useState(false);
  const [collaboration, setCollaboration] = useState<Collaboration>();

  const [isAboutToSign, setIsAboutToSign] = useState(false);
  const [isAboutToEndCollab, setIsAboutToEndCollab] = useState(false);

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

    if (locationStr === 'parent') {
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
  const [nextMonth, setNextMonth] = useState<keyof MonthAvailability | null>(
    null
  );

  const [parentAvatar, setParentAvatar] = useState<Base64String | null>(null);
  const [babysitterAvatar, setBabysitterAvatar] = useState<Base64String | null>(
    null
  );

  const {
    isLoading: isUpdating,
    getCollaboration,
    updateCollaboration,
  } = useCollaboration();
  const { isLoading: isUpdatingMeeting } = useMeeting();
  const { getAvailability } = useBabysitter();

  const handleSubmit = async () => {
    if (!collaboration || !collaboration.collaborationId) {
      return;
    }

    try {
      await updateCollaboration(collaboration.collaborationId, {
        state: CollaborationState.ONGOING,
      });
      dispatch!({
        type: 'success',
        payload: { message: t('collaboration.submit.success') },
      });
      setTimeout(
        () => navigate(`/profile/${user?.uid}?tab=collaborations`),
        2000
      );
    } catch {
      dispatch!({
        type: 'success',
        payload: { message: t('collaboration.submit.error') },
      });
    }
  };

  const handleTempSave = async () => {
    if (!collaboration || !collaboration.collaborationId) {
      return;
    }

    try {
      await updateCollaboration(collaboration.collaborationId, {
        location,
        type,
        currentMonth: month,
      });
      dispatch!({
        type: 'info',
        payload: { message: t('collaboration.temporary.success') },
      });
    } catch {
      dispatch!({
        type: 'info',
        payload: { message: t('collaboration.error.success') },
      });
    }
  };

  const handleIsAboutToSign = () => {
    if (!location || !type || !month) {
      dispatch!({
        type: 'warning',
        payload: { message: t('collaboration.sign.required') },
      });
      return;
    }

    setIsAboutToSign(true);
  };

  const handleSignParent = async () => {
    if (!collaboration || !collaboration.collaborationId) {
      return;
    }

    try {
      await updateCollaboration(collaboration.collaborationId, {
        parentSignature: true,
        location,
        type,
        currentMonth: month,
      });
      dispatch!({
        type: 'success',
        payload: {
          message: `${t('collaboration.sign.success')}. ${t('general.reloading')}`,
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
          message: `${t('collaboration.sign.success')}. ${t('general.reloading')}`,
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

  const handleEndCollab = async () => {
    if (!collaboration || !collaboration.collaborationId) {
      return;
    }

    let nextState: CollaborationState;
    if (collaboration.state === CollaborationState.ONGOING) {
      nextState = CollaborationState.AWAITING_PAYMENT;
    } else if (collaboration.state === CollaborationState.TEMPORARY) {
      nextState = CollaborationState.CANCELED;
    } else {
      throw new Error();
    }

    try {
      await updateCollaboration(collaboration.collaborationId, {
        canceled: true,
        state: nextState,
      });

      if (nextState === CollaborationState.AWAITING_PAYMENT) {
        dispatch!({
          type: 'info',
          payload: {
            message: `${t('collaboration.finished.awaitingPayment')}. ${t('general.reloading')}`,
          },
        });
        setTimeout(() => window.location.reload(), 2000);
      } else if (nextState === CollaborationState.CANCELED) {
        await updateMeeting(collaboration.collaborationId, {
          state: MeetingState.ENDED,
        });

        dispatch!({
          type: 'warning',
          payload: {
            message: `${t('collaboration.finished.canceled')}. ${t('general.redirect')}`,
          },
        });
        setTimeout(
          () => navigate(`/profile/${user?.uid}?tab=collaboration`),
          2000
        );
      }
    } catch {
      dispatch!({
        type: 'error',
        payload: { message: t('collaboration.finished.error') },
      });
    }
  };

  const handleAdvanceMonth = async () => {
    if (!collaboration || !collaboration.collaborationId) {
      return;
    }

    if (!nextMonth) {
      dispatch!({
        type: 'error',
        payload: { message: t('error.monthRequired') },
      });
      return;
    }

    try {
      await updateCollaboration(collaboration.collaborationId, {
        state: CollaborationState.AWAITING_PAYMENT,
        nextMonth,
      });
      dispatch!({
        type: 'info',
        payload: {
          message: `${t('collaboration.advance.payment')}. ${t('general.reloading')}`,
        },
      });
      setTimeout(() => window.location.reload(), 2000);
    } catch {
      dispatch!({
        type: 'error',
        payload: { message: t('collaboration.advance.error') },
      });
    }
  };

  const handlePayment = async () => {
    if (!collaboration || !collaboration.collaborationId) {
      return;
    }

    try {
      await doPayment({
        collaboration,
        puid: collaboration.puid,
        buid: collaboration.buid,
        time: new Date(),
      });

      if (collaboration.canceled) {
        await updateCollaboration(collaboration.collaborationId, {
          state: CollaborationState.FINISHED,
        });
        await updateMeeting(collaboration.collaborationId, {
          state: MeetingState.ENDED,
        });

        dispatch!({
          type: 'success',
          payload: {
            message: `${t('collaboration.payment.success')}. ${t('collaboration.payment.nowCancel')}`,
          },
        });
        setTimeout(() => navigate(`/profile/${user?.uid}`), 2000);
      } else {
        await updateCollaboration(collaboration.collaborationId, {
          state: CollaborationState.ONGOING,
          currentMonth: collaboration.nextMonth,
        });

        dispatch!({
          type: 'success',
          payload: { message: t('collaboration.payment.success') },
        });
        setTimeout(() => window.location.reload(), 2000);
      }
    } catch {
      dispatch!({
        type: 'error',
        payload: { message: t('collaboration.payment.error') },
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
    <Stack sx={{ width: '100%', placeItems: 'center' }} spacing={12}>
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
          {collaboration.state === CollaborationState.TEMPORARY ? (
            <Stack sx={{ placeItems: 'center' }} spacing={1}>
              <InputLabel>{t('babysitter.ad.location.title')}*</InputLabel>
              <ToggleButtonGroup
                exclusive
                value={locationStr}
                onChange={(_e, v) => v !== null && setLocationStr(v)}
                sx={{ width: '100%' }}
                disabled={
                  (details?.role === 'PARENT' &&
                    collaboration.parentSignature === true) ||
                  (details?.role === 'BABYSITTER' &&
                    collaboration.babysitterSignature === true)
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

              <InputLabel>{t('babysitter.ad.type.title')}*</InputLabel>
              <ToggleButtonGroup
                exclusive
                value={type}
                onChange={(_e, v) => v !== null && setType(v)}
                sx={{ width: '100%' }}
                disabled={
                  (details?.role === 'PARENT' &&
                    collaboration.parentSignature === true) ||
                  (details?.role === 'BABYSITTER' &&
                    collaboration.babysitterSignature === true)
                }
              >
                <ToggleButton
                  value="PART_TIME"
                  sx={{ textTransform: 'none', width: '100%' }}
                >
                  {t('babysitter.ad.type.PART_TIME')}
                </ToggleButton>
                <ToggleButton
                  value="FULL_TIME"
                  sx={{ textTransform: 'none', width: '100%' }}
                >
                  {t('babysitter.ad.type.FULL_TIME')}
                </ToggleButton>
              </ToggleButtonGroup>

              <InputLabel>
                {t('babysitter.calendar.meeting.interested.title')}*
              </InputLabel>
              <Select
                variant="outlined"
                value={month}
                onChange={e =>
                  setMonth(e.target.value as keyof MonthAvailability)
                }
                sx={{ width: '100%' }}
                size="small"
                disabled={
                  (details?.role === 'PARENT' &&
                    collaboration.parentSignature === true) ||
                  (details?.role === 'BABYSITTER' &&
                    collaboration.babysitterSignature === true)
                }
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
          ) : (
            collaboration.state !== CollaborationState.CANCELED && (
              <Stack spacing={1}>
                <Typography variant="h6">
                  {t('babysitter.ad.location.title')}
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  {collaboration.location?.number}{' '}
                  {collaboration.location?.address}{' '}
                  {collaboration.location?.city}
                </Typography>
                <Typography variant="h6">
                  {t('babysitter.ad.type.title')}
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  {t(`babysitter.ad.type.${collaboration.type}`)}
                </Typography>
                <Typography variant="h6">
                  {t('collaboration.ongoing.currentMonth')}
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  {t(
                    `babysitter.calendar.months.${collaboration.currentMonth}`
                  )}
                </Typography>
                {collaboration.state === CollaborationState.ONGOING &&
                  details?.role === 'PARENT' && (
                    <>
                      <Typography variant="h6">
                        {t('collaboration.advance.nextMonth')}
                      </Typography>
                      <Select
                        variant="outlined"
                        value={nextMonth}
                        onChange={e =>
                          setNextMonth(
                            e.target.value as keyof MonthAvailability
                          )
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
                    </>
                  )}
              </Stack>
            )
          )}
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Stack>
            {collaboration.state === CollaborationState.TEMPORARY && (
              <Button
                sx={{ color: 'error.main' }}
                startIcon={<Cancel />}
                onClick={() => setIsAboutToEndCollab(true)}
              >
                {t('collaboration.temporary.cancel')}
              </Button>
            )}
            {collaboration.state === CollaborationState.ONGOING && (
              <Button
                sx={{ color: 'error.main' }}
                startIcon={<Cancel />}
                onClick={() => setIsAboutToEndCollab(true)}
              >
                {t('collaboration.ongoing.end')}
              </Button>
            )}
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            divider={<Divider orientation="vertical" flexItem />}
          >
            {collaboration.state === CollaborationState.TEMPORARY && (
              <Button
                sx={{ color: 'warning.main' }}
                startIcon={<Draw />}
                disabled={
                  isUpdating ||
                  (details?.role === 'BABYSITTER' &&
                    collaboration.babysitterSignature === true) ||
                  (details?.role === 'PARENT' &&
                    collaboration.parentSignature === true)
                }
                onClick={handleIsAboutToSign}
              >
                {details?.role === 'PARENT'
                  ? collaboration.parentSignature === true
                    ? t('collaboration.sign.done')
                    : t('collaboration.sign.do')
                  : ''}
                {details?.role === 'BABYSITTER'
                  ? collaboration.babysitterSignature === true
                    ? t('collaboration.sign.done')
                    : t('collaboration.sign.do')
                  : ''}
              </Button>
            )}
            {collaboration.state === CollaborationState.TEMPORARY &&
              ((details?.role === 'BABYSITTER' &&
                collaboration.babysitterSignature === false) ||
                (details?.role === 'PARENT' &&
                  collaboration.parentSignature === false)) && (
                <Button
                  startIcon={<Save />}
                  sx={{ color: 'info.main' }}
                  onClick={handleTempSave}
                  disabled={isUpdating}
                >
                  {t('collaboration.temporary.title')}
                </Button>
              )}
            {collaboration.state === CollaborationState.TEMPORARY &&
              collaboration.parentSignature === true &&
              collaboration.babysitterSignature === true && (
                <Button
                  onClick={handleSubmit}
                  startIcon={<DoneAllIcon />}
                  sx={{ color: 'success.main' }}
                >
                  {t('collaboration.submit.title')}
                </Button>
              )}
            {collaboration.state === CollaborationState.ONGOING &&
              details?.role === 'PARENT' && (
                <Button
                  startIcon={<CheckCircleOutline />}
                  sx={{ color: 'info.main' }}
                  onClick={handleAdvanceMonth}
                >
                  {t('collaboration.ongoing.advanceMonth')}
                </Button>
              )}
            {collaboration.state === CollaborationState.AWAITING_PAYMENT &&
              details?.role === 'PARENT' && (
                <Button
                  startIcon={<Payment />}
                  sx={{ color: 'success.main' }}
                  onClick={handlePayment}
                >
                  {collaboration.canceled
                    ? t('collaboration.payment.final')
                    : t('collaboration.payment.pay')}
                </Button>
              )}
          </Stack>
        </CardActions>
      </Card>
      {(isUpdating || isUpdatingMeeting || isPaying) && <LoadingSpinner />}

      <Dialog open={isAboutToEndCollab}>
        <DialogTitle>
          <Stack
            direction="row"
            sx={{ justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Stack direction="row" sx={{ alignItems: 'center' }} spacing={1}>
              <WarningAmber />
              <Typography variant="h6">
                {t('collaboration.sign.header')}
              </Typography>
            </Stack>
            <IconButton edge="end" onClick={() => setIsAboutToEndCollab(false)}>
              <CloseIcon />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ color: 'text.secondary' }}>
            {t('collaboration.finished.prompt1')}
          </Typography>
          {collaboration.state !== CollaborationState.TEMPORARY && (
            <>
              <br />
              <Typography sx={{ color: 'text.secondary' }}>
                {t('collaboration.finished.prompt2')}
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleEndCollab}
            sx={{ color: 'warning.main' }}
            disabled={isUpdating}
          >
            {t('general.yes')}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isAboutToSign}>
        <DialogTitle>
          <Stack
            direction="row"
            sx={{ justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Stack direction="row" sx={{ alignItems: 'center' }} spacing={1}>
              <WarningAmber />
              <Typography variant="h6">
                {t('collaboration.sign.header')}
              </Typography>
            </Stack>
            <IconButton edge="end" onClick={() => setIsAboutToSign(false)}>
              <CloseIcon />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ color: 'text.secondary' }}>
            {t('collaboration.sign.prompt1')}
          </Typography>{' '}
          <br />
          <Typography sx={{ color: 'text.secondary' }}>
            {t('collaboration.sign.prompt2')}
          </Typography>{' '}
          <br />
          <Typography sx={{ color: 'text.secondary' }}>
            {t('collaboration.sign.prompt3')}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={
              details?.role === 'BABYSITTER'
                ? handleSignBabysitter
                : handleSignParent
            }
            sx={{ color: 'warning.main' }}
            disabled={isUpdating}
          >
            {t('general.yes')}
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};
