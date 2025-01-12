import { ProfileProvider } from '@/context/ProfileProvider.tsx';
import { Navigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { UserDetails } from '@/types/UserDetails.ts';
import { Base64String } from '@/types/Avatar.ts';
import { useUserDetails } from '@hooks/useUserDetails.hook.ts';
import { LoadingSpinner } from '@components/LoadingSpinner.tsx';

export interface ProfileDetails {
  details: UserDetails;
  avatar?: Base64String;
}

export const ProfilePage = () => {
  const { uid } = useParams();
  const [details, setDetails] = useState<UserDetails>();
  const [avatar, setAvatar] = useState<Base64String>();
  const { isRequesting, getUserDetails, getUserAvatar } = useUserDetails();

  if (!uid) {
    return <Navigate to={'/404'} />;
  }

  useEffect(() => {
    const fetch = async () => {
      const details = await getUserDetails(uid);
      const avatar = await getUserAvatar(uid);

      return { details, avatar } as ProfileDetails;
    };

    fetch().then(({ details, avatar }) => {
      setDetails(details);
      setAvatar(avatar);
    });
  }, [uid]);

  return isRequesting || !details ? (
    <LoadingSpinner />
  ) : (
    <ProfileProvider details={details} avatar={avatar} />
  );
};
