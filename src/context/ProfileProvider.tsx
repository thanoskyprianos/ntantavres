import { createContext, useContext } from 'react';
import { UserDetails } from '@/types/UserDetails.ts';
import { Base64String } from '@/types/Avatar.ts';
import { ProfileDetails } from '@pages/profile/ProfilePage.tsx';
import { ProfileContent } from '@pages/profile/ProfileContent.tsx';

type ProfileProviderType = UserDetails & { avatar: Base64String };
const ProfileContext = createContext<ProfileProviderType>(
  {} as ProfileProviderType
);
export const useProfileContext = () => useContext(ProfileContext);

export const ProfileProvider = ({ details, avatar }: ProfileDetails) => {
  return (
    <ProfileContext.Provider
      value={{ ...details, avatar } as ProfileProviderType}
    >
      <ProfileContent />
    </ProfileContext.Provider>
  );
};
