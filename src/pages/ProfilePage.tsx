import { Navigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { UserDetails } from '@/types/UserDetails.ts';
import { useUserDetails } from '@hooks/useUserDetails.hook.ts';
import { LoadingSpinner } from '@components/LoadingSpinner.tsx';
import { ParentProfilePage } from '@pages/parent/ParentProfilePage.tsx';
import { BabysitterProfilePage } from '@pages/babysitter/BabysitterProfilePage.tsx';
import { useAuthContext } from '@/context/AuthProvider.tsx';

export const ProfilePage = () => {
  const { uid } = useParams();
  const { user } = useAuthContext();
  const [details, setDetails] = useState<UserDetails>();
  const { isRequesting, getUserDetails } = useUserDetails();

  if (!uid) {
    return <Navigate to={'/404'} />;
  }

  useEffect(() => {
    // TODO: also fetch avatar
    if (!user) {
      return;
    }

    const fetch = async () => await getUserDetails(uid);

    fetch().then(res => setDetails(res as UserDetails));
  }, [user]);

  return isRequesting || !details ? (
    <LoadingSpinner />
  ) : details.role === 'PARENT' ? (
    <ParentProfilePage {...details} />
  ) : (
    <BabysitterProfilePage {...details} />
  );
};
