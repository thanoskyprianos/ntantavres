import {
  Card,
  CardActions,
  CardHeader,
  IconButton,
  Skeleton,
  Typography,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { AvatarDisplay } from '@components/util/AvatarDisplay.tsx';
import { useEffect, useState } from 'react';
import { useAuthContext } from '@/context/AuthProvider.tsx';
import { Collaboration, CollaborationState } from '@/types/Collaboration.ts';
import { useUserDetails } from '@hooks/useUserDetails.hook.ts';
import { UserDetails } from '@/types/UserDetails.ts';
import { Base64String } from '@/types/Avatar.ts';
import { useTranslation } from 'react-i18next';
import { KeyboardArrowRight } from '@mui/icons-material';

interface CollaborationTabProps {
  collaboration?: Collaboration;
}

export const CollaborationTab = ({ collaboration }: CollaborationTabProps) => {
  const { t } = useTranslation();
  const { user } = useAuthContext();
  const { getUserDetails, getUserAvatar } = useUserDetails();
  const navigate = useNavigate();

  const [details, setDetails] = useState<UserDetails>();
  const [avatar, setAvatar] = useState<Base64String>();

  useEffect(() => {
    if (!collaboration || !user) {
      return;
    }

    // get user details
    const uid =
      collaboration.puid != user?.uid ? collaboration.puid : collaboration.buid;
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
  }, [collaboration, user]);

  return !details || !collaboration ? (
    <Skeleton variant="rounded" height={75} sx={{ borderRadius: '15px' }} />
  ) : (
    <Card
      sx={{
        borderRadius: '15px',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
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
        subheader={`${t(`collaboration.state.${CollaborationState[collaboration.state?.valueOf() || 0]}`)}`}
        avatar={
          <AvatarDisplay avatar={avatar} sx={{ width: '50px', height: '50px' }}>
            <Typography variant="h3">
              {details.firstName &&
                details.lastName &&
                details.firstName.charAt(0).toUpperCase() +
                  details.lastName.charAt(0).toUpperCase()}
            </Typography>
          </AvatarDisplay>
        }
      />
      {collaboration.state !== CollaborationState.CANCELED && (
        <CardActions>
          <IconButton
            onClick={() =>
              navigate(`/collaboration/${collaboration?.collaborationId}`)
            }
            size="large"
          >
            <KeyboardArrowRight />
          </IconButton>
        </CardActions>
      )}
    </Card>
  );
};
