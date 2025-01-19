import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Rating as Stars,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Rating } from '@/types/Rating.ts';
import { UserDetails } from '@/types/UserDetails.ts';
import { AvatarDisplay } from '@components/util/AvatarDisplay.tsx';
import { Base64String } from '@/types/Avatar.ts';
import { useTranslation } from 'react-i18next';
import { useUserDetails } from '@hooks/useUserDetails.hook.ts';
import { Link } from 'react-router-dom';
import { firestoreTimestampToDate } from '@util/util.ts';
import { format } from 'date-fns';
import { localeTextMap } from '@config/i18n.ts';
import i18n from 'i18next';

interface RatingElements {
  rating?: Rating;
}

export const RatingCard = ({ rating }: RatingElements) => {
  const { t } = useTranslation();
  const { getUserDetails, getUserAvatar } = useUserDetails();

  const [details, setDetails] = useState<UserDetails>();
  const [avatar, setAvatar] = useState<Base64String>();

  useEffect(() => {
    if (!rating) {
      return;
    }

    const fetch = async () => {
      if (!rating.puid) {
        return;
      }

      const details = await getUserDetails(rating.puid);
      const avatar = await getUserAvatar(rating.puid);

      setDetails(details);
      setAvatar(avatar);
    };

    fetch().then();
  }, [rating]);

  return !details || !avatar || !rating ? (
    <Skeleton
      variant="rounded"
      height={250}
      sx={{ borderRadius: '15px', width: 'min(95%, 500px)' }}
    />
  ) : (
    <Card
      raised
      sx={{
        height: '250px',
        width: 'min(95%, 500px)',
        borderRadius: '15px',
      }}
    >
      <CardHeader
        avatar={<AvatarDisplay avatar={avatar} />}
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
        subheader={format(firestoreTimestampToDate(rating.time), 'PP p', {
          locale: localeTextMap.get(i18n.language),
        })}
      />
      <Divider />
      <CardContent>
        <Stack
          sx={{
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '137px',
          }}
          divider={<Divider flexItem />}
        >
          <Stack sx={{ width: '100%' }}>
            <Typography variant="h6">{t('rating.descriptionLabel')}</Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                height: '60px',
                overflow: 'auto',
              }}
            >
              {rating.description || t('parent.info.notSet')}
            </Typography>
          </Stack>
          <Stars value={rating.rating} readOnly />
        </Stack>
      </CardContent>
    </Card>
  );
};
