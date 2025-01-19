import { Stack, Typography } from '@mui/material';
import { RatingCard } from '@components/RatingsCard.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useRating } from '@hooks/useRating.hook.ts';
import { Rating } from '@/types/Rating.ts';
import { LoadingSpinner } from '@components/LoadingSpinner.tsx';
import { useTranslation } from 'react-i18next';
import { UserDetails } from '@/types/UserDetails.ts';
import { useUserDetails } from '@hooks/useUserDetails.hook.ts';
import { firestoreTimestampToDate } from '@util/util.ts';

export const Ratings = () => {
  const { t } = useTranslation();
  const { uid } = useParams();
  const { isLoading, getRatings } = useRating();
  const { isRequesting, getUserDetails } = useUserDetails();
  const navigate = useNavigate();

  const [details, setDetails] = useState<UserDetails>();
  const [ratings, setRatings] = useState<Rating[]>();

  useEffect(() => {
    if (!uid) {
      return;
    }

    const fetch = async () => {
      try {
        const details = await getUserDetails(uid);

        if (details.role === 'PARENT') {
          navigate('/404');
        }

        setDetails(details);
      } catch {
        navigate('/404');
      }

      const ratings = await getRatings(uid);
      setRatings(ratings);
    };

    fetch().then();
  }, [uid]);

  return isLoading || isRequesting || !details ? (
    <LoadingSpinner />
  ) : (
    <Stack spacing={2} sx={{ alignItems: 'center' }}>
      <Typography variant="h5">
        {t('rating.of', {
          firstName: details.firstName,
          lastName: details.lastName,
        })}
      </Typography>
      {!ratings ? (
        <Typography variant="h5" sx={{ color: 'text.secondary' }}>
          {t('rating.notFound')}
        </Typography>
      ) : (
        <>
          {ratings
            .sort(
              (a, b) =>
                firestoreTimestampToDate(b?.time || new Date()).getTime() -
                firestoreTimestampToDate(a?.time || new Date()).getTime()
            )
            .map(rating => (
              <RatingCard key={rating.ratingId} rating={rating} />
            ))}
        </>
      )}
    </Stack>
  );
};
