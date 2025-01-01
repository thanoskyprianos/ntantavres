import { Navigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { UserDetails } from '@/types/UserDetails.ts';
import { useUserDetails } from '@hooks/useUserDetails.hook.ts';
import { LoadingSpinner } from '@components/LoadingSpinner.tsx';
import { ParentProfilePage } from '@pages/parent/ParentProfilePage.tsx';
import { BabysitterProfilePage } from '@pages/babysitter/BabysitterProfilePage.tsx';
import { useAuthContext } from '@/context/AuthProvider.tsx';
import { Base64String } from '@/types/Avatar.ts';

interface ProfileDetails {
  details: UserDetails;
  avatar?: Base64String;
}

export const ProfilePage = () => {
  const { uid } = useParams();
  const { user } = useAuthContext();
  const [details, setDetails] = useState<UserDetails>();
  const [avatar, setAvatar] = useState<Base64String>();
  const { isRequesting, getUserDetails, getUserAvatar } = useUserDetails();

  if (!uid) {
    return <Navigate to={'/404'} />;
  }

  useEffect(() => {
    if (!user) {
      return;
    }

    const fetch = async () => {
      const details = await getUserDetails(uid);
      const avatar = await getUserAvatar(uid);

      return { details, avatar } as ProfileDetails;
    };

    fetch().then(({ details, avatar }) => {
      setDetails(details);
      setAvatar(avatar);
    });
  }, [user, uid]);

  return isRequesting || !details ? (
    <LoadingSpinner />
  ) : details.role === 'PARENT' ? (
    <ParentProfilePage {...details} avatar={avatar} key={details.uid} />
  ) : (
    <BabysitterProfilePage {...details} key={details.uid} />
  );
};
