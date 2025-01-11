import { TabSetterContext } from '@/context/TabSetterProvider.tsx';
import { Suspense, useEffect, useState } from 'react';
import { useProfileContext } from '@/context/ProfileProvider.tsx';
import { useAuthContext } from '@/context/AuthProvider.tsx';
import { LoadingSpinner } from '@components/LoadingSpinner.tsx';
import { ProfileTabs } from '@pages/profile/ProfileTabs.tsx';
import { Box, Card, Stack, Typography } from '@mui/material';
import { AvatarDisplay } from '@components/util/AvatarDisplay.tsx';
import { ProfileNav } from '@components/tabs/ProfileNav.tsx';
import { useDeviceDetect } from '@hooks/useDeviceDetect.hook.ts';
import { useSearchParams } from 'react-router-dom';

export const ProfileContent = () => {
  const { user } = useAuthContext();
  const { uid, role } = useProfileContext();
  const [selectedTab, setSelectedTab] = useState(0);
  const [searchParams] = useSearchParams();
  const { device } = useDeviceDetect();
  const { firstName, lastName, avatar, location } = useProfileContext();

  const validTabs = ProfileTabs.filter(tab => {
    const requiresAuth = tab.requiresAuth ? !!user : true;
    const isPrivate = user?.uid !== uid && tab.privateTab;
    const isCorrectRole = tab.role === 'BOTH' || tab.role === role;

    return requiresAuth && !isPrivate && isCorrectRole;
  });

  const setSelectedTabStr = (tab: string) => {
    setSelectedTab(
      Math.max(
        validTabs.findIndex(t => t.paramRoute === tab),
        0
      )
    );
  };

  const currentTab = searchParams.get('tab');

  useEffect(() => {
    setSelectedTabStr(currentTab || '');
  }, [currentTab]);

  const mobileOverflowFix = device !== 'desktop' ? { width: '100%' } : {};

  return (
    <TabSetterContext.Provider value={{ setSelectedTab: setSelectedTabStr }}>
      <Stack
        sx={{
          placeItems: 'center',
          padding: '0 15px',
        }}
        spacing={1}
      >
        <Card
          sx={{
            width: '75%',
            borderRadius: '15px',
            padding: '0 15px',
            ...mobileOverflowFix,
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            sx={{
              padding: '20px 0',
              placeContent: device !== 'mobile' ? 'center' : 'start',
              overflow: 'auto',
            }}
          >
            <AvatarDisplay
              avatar={avatar}
              sx={{
                width: 100,
                height: 100,
                border: '2px solid',
                borderColor: 'primary.main',
              }}
            >
              <Typography variant="h3">
                {firstName &&
                  lastName &&
                  firstName.charAt(0).toUpperCase() +
                    lastName.charAt(0).toUpperCase()}
              </Typography>
            </AvatarDisplay>

            <Stack>
              <Typography variant="h4" sx={{ textWrap: 'nowrap' }}>
                {firstName} {lastName}
              </Typography>
              {location?.city && (
                <Typography variant="h6">{location.city}</Typography>
              )}
            </Stack>
          </Stack>
        </Card>
        <Stack
          direction={device === 'desktop' ? 'row' : 'column'}
          spacing={1}
          sx={{
            width: '75%',
            [device === 'desktop' ? 'alignItems' : 'placeContent']: 'start',
            ...mobileOverflowFix,
          }}
        >
          <ProfileNav
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            tabs={validTabs}
          />
          <Suspense fallback={<LoadingSpinner />}>
            <Box sx={{ width: '100%' }}>{validTabs[selectedTab].content}</Box>
          </Suspense>
        </Stack>
      </Stack>
    </TabSetterContext.Provider>
  );
};
