import { Meeting, MeetingState } from '@/types/Meeting.ts';
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
  IconButton,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Dispatch, useEffect, useState } from 'react';
import { useAuthContext } from '@/context/AuthProvider.tsx';
import { useUserDetails } from '@hooks/useUserDetails.hook.ts';
import { useCollaboration } from '@hooks/useCollaboration.hook.ts';
import { UserDetails } from '@/types/UserDetails.ts';
import { Base64String } from '@/types/Avatar.ts';
import { AvatarDisplay } from '@components/util/AvatarDisplay.tsx';
import { firestoreTimestampToDate } from '@util/util.ts';
import { format } from 'date-fns';
import { localeTextMap } from '@config/i18n.ts';
import i18n from 'i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useMeeting } from '@hooks/useMeeting.hook.ts';
import { useSnackbarContext } from '@/context/SnackbarProvider.tsx';
import CloseIcon from '@mui/icons-material/Close';
import { AddCircleOutline, Cancel, WarningAmber } from '@mui/icons-material';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { Collaboration, CollaborationState } from '@/types/Collaboration.ts';
import { useParent } from '@hooks/useParent.hook.ts';
import { useBabysitter } from '@hooks/useBabysitter.hook.ts';
import { ParentAd } from '@/types/ParentAd.ts';
import { BabysitterAd } from '@/types/BabysitterTypes.ts';

interface MeetingTabProps {
  meeting?: Meeting;
}

interface CancelMeetingDialogProps {
  cancelMeeting: boolean;
  setCancelMeeting: Dispatch<boolean>;
  meeting?: Meeting;
}

interface ApproveMeetingDialogProps {
  approveMeeting: boolean;
  setApproveMeeting: Dispatch<boolean>;
  meeting?: Meeting;
}

const CancelMeetingDialog = ({
  cancelMeeting,
  setCancelMeeting,
  meeting,
}: CancelMeetingDialogProps) => {
  const { t } = useTranslation();
  const { isLoading, updateMeeting } = useMeeting();
  const dispatch = useSnackbarContext();

  const handleCloseMeeting = async () => {
    if (!meeting?.meetingId) {
      return;
    }

    try {
      await updateMeeting(meeting.meetingId, {
        state: MeetingState.CLOSED,
      });
      dispatch!({
        type: 'success',
        payload: {
          message: `${t('meeting.close.success')}. ${t('general.reloading')}`,
        },
      });
      setTimeout(() => window.location.reload(), 2000);
    } catch {
      dispatch!({
        type: 'error',
        payload: { message: t('meeting.close.error') },
      });
    }
  };

  return (
    <Dialog
      open={cancelMeeting}
      PaperProps={{ style: { borderRadius: '15px' } }}
      fullWidth
    >
      <Card sx={{ padding: '0 5px 5px 5px', overflow: 'auto' }}>
        <DialogTitle>
          <Stack
            direction="row"
            sx={{ justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Stack direction="row" sx={{ alignItems: 'center' }} spacing={1}>
              <WarningAmber />
              <Typography variant="h6">{t('meeting.close.header')}</Typography>
            </Stack>
            <IconButton edge="end" onClick={() => setCancelMeeting(false)}>
              <CloseIcon />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ color: 'text.secondary' }}>
            {t('meeting.close.prompt')}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseMeeting}
            sx={{ color: 'warning.main' }}
            disabled={isLoading}
          >
            {t('general.yes')}
          </Button>
        </DialogActions>
      </Card>
    </Dialog>
  );
};

const ApproveMeetingDialog = ({
  approveMeeting,
  setApproveMeeting,
  meeting,
}: ApproveMeetingDialogProps) => {
  const { t } = useTranslation();
  const { isLoading, updateMeeting } = useMeeting();
  const dispatch = useSnackbarContext();

  const handleApproveMeeting = async () => {
    if (!meeting?.meetingId) {
      return;
    }

    try {
      await updateMeeting(meeting.meetingId, {
        state: MeetingState.APPROVED,
      });
      dispatch!({
        type: 'success',
        payload: {
          message: `${t('meeting.approve.success')}. ${t('general.reloading')}`,
        },
      });
      setTimeout(() => window.location.reload(), 2000);
    } catch {
      dispatch!({
        type: 'error',
        payload: { message: t('meeting.approve.error') },
      });
    }
  };

  return (
    <Dialog
      open={approveMeeting}
      PaperProps={{ style: { borderRadius: '15px' } }}
      fullWidth
    >
      <Card sx={{ padding: '0 5px 5px 5px', overflow: 'auto' }}>
        <DialogTitle>
          <Stack
            direction="row"
            sx={{ justifyContent: 'space-between', alignItems: 'center' }}
          >
            {t('meeting.approve.header')}
            <IconButton edge="end" onClick={() => setApproveMeeting(false)}>
              <CloseIcon />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ color: 'text.secondary' }}>
            {t('meeting.approve.prompt')}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleApproveMeeting}
            sx={{ color: 'success.main' }}
            disabled={isLoading}
          >
            {t('general.yes')}
          </Button>
        </DialogActions>
      </Card>
    </Dialog>
  );
};

export const MeetingTab = ({ meeting }: MeetingTabProps) => {
  const { t } = useTranslation();
  const { user, details: uDetails } = useAuthContext();
  const { isRequesting, getUserAvatar, getUserDetails } = useUserDetails();
  const { getCollaboration, setCollaboration } = useCollaboration();
  const { getAd: getAdP } = useParent();
  const { getAd: getAdB } = useBabysitter();

  const dispatch = useSnackbarContext();
  const navigate = useNavigate();

  const [details, setDetails] = useState<UserDetails>();
  const [avatar, setAvatar] = useState<Base64String>();

  const [cancelMeeting, setCancelMeeting] = useState(false);
  const [approveMeeting, setApproveMeeting] = useState(false);

  const [isCreatingCollab, setIsCreatingCollab] = useState(false);

  // const handlePlanMeeting = async () => {};

  const handleViewPlan = async () => {};

  useEffect(() => {
    if (!meeting || !user) {
      return;
    }

    // get user details
    const uid = meeting.puid != user?.uid ? meeting.puid : meeting.buid;
    if (!uid) {
      return;
    }

    const fetch = async () => {
      const details = await getUserDetails(uid);
      const avatar = await getUserAvatar(uid);

      setDetails(details);
      setAvatar(avatar);
    };

    fetch().then();
  }, [meeting, user]);

  const handleCollab = async () => {
    if (!meeting || !meeting.meetingId || !meeting.puid || !meeting.buid) {
      return;
    }

    setIsCreatingCollab(true);

    const collab = await getCollaboration(meeting.meetingId);
    if (!collab) {
      let parentAd: ParentAd | undefined;
      let babysitterAd: BabysitterAd | undefined;

      try {
        parentAd = await getAdP(meeting.puid);
        babysitterAd = await getAdB(meeting.buid);
      } catch {
        parentAd = undefined;
      }

      const newCollab: Collaboration = {
        parentAd,
        babysitterAd,
        appointment: meeting,
        currentMonth: meeting.interestedFor,
        state: CollaborationState.TEMPORARY,
        parentSignature: false,
        babysitterSignature: false,
        puid: meeting.puid,
        buid: meeting.buid,

        collaborationId: meeting.meetingId,
      };

      try {
        await setCollaboration(meeting.meetingId, newCollab);
        dispatch!({
          type: 'success',
          payload: {
            message: `${t('collaboration.create.success')}. ${t('general.redirect')}`,
          },
        });
        setTimeout(() => navigate(`/collaboration/${meeting.meetingId}`), 2000);
      } catch {
        dispatch!({
          type: 'error',
          payload: { message: t('collaboration.create.error') },
        });
      } finally {
        setIsCreatingCollab(false);
      }
    } else {
      navigate(`/collaboration/${meeting.meetingId}`);
    }
  };

  return isRequesting || !meeting || !user || !details ? (
    <Skeleton height={400} variant="rounded" sx={{ borderRadius: '15px' }} />
  ) : (
    <>
      <Card sx={{ borderRadius: '15px', width: '100%' }}>
        <CardHeader
          title={
            <Link to={`/profile/${details.uid}`}>
              <Typography
                variant="h6"
                sx={{
                  color: 'text.primary',
                  textDecoration: 'underline',
                  textDecorationColor: 'text.primary',
                  display: 'inline-block',
                }}
              >
                {details.firstName} {details.lastName}
              </Typography>
            </Link>
          }
          subheader={`${t(`babysitter.calendar.meeting.state.${MeetingState[meeting.state?.valueOf() || 0]}`)} ${t('babysitter.calendar.meeting.title')}`}
          avatar={
            <AvatarDisplay
              avatar={avatar}
              sx={{ width: '50px', height: '50px' }}
            >
              <Typography variant="h3">
                {details.firstName &&
                  details.lastName &&
                  details.firstName.charAt(0).toUpperCase() +
                    details.lastName.charAt(0).toUpperCase()}
              </Typography>
            </AvatarDisplay>
          }
        />
        <CardContent>
          <Typography variant="h6" sx={{ color: 'text.main' }}>
            {t('babysitter.calendar.meeting.location.place')}
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            {t(`babysitter.calendar.meeting.location.${meeting?.place}`)}
          </Typography>
          {meeting?.place === 'in-person' && meeting.location && (
            <>
              <Typography variant="h6" sx={{ color: 'text.main' }}>
                {t(`babysitter.ad.location.title`)}
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                {meeting?.location?.number} {meeting?.location?.address}{' '}
                {meeting?.location.city}
              </Typography>
            </>
          )}
          <Typography variant="h6" sx={{ color: 'text.main' }}>
            {t('babysitter.calendar.meeting.date')}
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            {format(firestoreTimestampToDate(meeting.dateTime), 'PP p', {
              locale: localeTextMap.get(i18n.language),
            })}
          </Typography>
          <Typography variant="h6" sx={{ color: 'text.main' }}>
            {t('babysitter.calendar.meeting.interested.title')}
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            {t(`babysitter.calendar.months.${meeting?.interestedFor}`)}
          </Typography>
        </CardContent>
        {meeting.state !== MeetingState.CLOSED && (
          <CardActions sx={{ float: 'right', bottom: '0' }}>
            {meeting.state === MeetingState.PLANNED && (
              <Button
                startIcon={<Cancel />}
                onClick={() => setCancelMeeting(true)}
                sx={{ color: 'error.main' }}
              >
                {t('meeting.close.title')}
              </Button>
            )}
            {meeting.state === MeetingState.PLANNED &&
              uDetails?.role === 'BABYSITTER' && (
                <Button
                  startIcon={<DoneAllIcon />}
                  onClick={() => setApproveMeeting(true)}
                  sx={{ color: 'success.main' }}
                >
                  {t('meeting.approve.title')}
                </Button>
              )}
            {meeting.state === MeetingState.APPROVED &&
              uDetails?.role === 'PARENT' && (
                <Button
                  sx={{ color: 'success.main' }}
                  startIcon={<AddCircleOutline />}
                  onClick={handleCollab}
                >
                  {t('meeting.plan.title')}
                </Button>
              )}
            {meeting.state === MeetingState.FINISHED && (
              <Button onClick={handleViewPlan} sx={{ color: 'warning.main' }}>
                {t('meeting.plan.title')}
              </Button>
            )}
          </CardActions>
        )}
      </Card>
      <CancelMeetingDialog
        cancelMeeting={cancelMeeting}
        setCancelMeeting={setCancelMeeting}
        meeting={meeting}
      />
      <ApproveMeetingDialog
        approveMeeting={approveMeeting}
        setApproveMeeting={setApproveMeeting}
        meeting={meeting}
      />
    </>
  );
};
