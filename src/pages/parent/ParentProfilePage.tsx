import React, { Suspense, useEffect, useState } from 'react';
import { UserDetails } from '@/types/UserDetails.ts';
import { useTranslation } from 'react-i18next';
import { Base64String } from '@/types/Avatar.ts';
import { Box, Card, Stack, Typography } from '@mui/material';
import { AvatarDisplay } from '@components/util/AvatarDisplay.tsx';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useSearchParams } from 'react-router-dom';
import { NavTab } from '@components/tabs/TabNav.tsx';
import ChecklistIcon from '@mui/icons-material/Checklist';
import ContactsIcon from '@mui/icons-material/Contacts';
import HistoryIcon from '@mui/icons-material/History';
import { Payment } from '@mui/icons-material';
import { useDeviceDetect } from '@hooks/useDeviceDetect.hook.ts';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';
import { ProfileNav } from '@components/tabs/ProfileNav.tsx';
import { ParentInfo, ParentSettings } from '@/routing/lazy.tabs.ts';
import { LoadingSpinner } from '@components/LoadingSpinner.tsx';
import { useAuthContext } from '@/context/AuthProvider.tsx';

interface ParentProfilePageProps extends UserDetails {
  avatar?: Base64String;
}

export const ParentProfilePage = (props: ParentProfilePageProps) => {
  const { user } = useAuthContext();
  const { uid, firstName, lastName, avatar, city } = props;

  const { t } = useTranslation();
  const { device } = useDeviceDetect();

  const [selectedTab, setSelectedTab] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get('tab');
  const setSelectedTabStr = (tab: string | number) => {
    if (typeof tab === 'number') {
      setSelectedTab(tab >= Tabs.length || tab < 0 ? 0 : tab);
    } else {
      setSelectedTab(Tabs.map(t => t.paramRoute).indexOf(tab) || 0);
    }
  };

  const Tabs: NavTab[] = [
    {
      title: t('parent.info.title'),
      icon: <InfoIcon />,
      paramRoute: 'info',
      content: (
        <ParentInfo t={t} {...props} setSelectedTab={setSelectedTabStr} />
      ),
    },
    {
      title: t('parent.actions.plannedMeetings'),
      icon: <CalendarMonthIcon />,
      paramRoute: 'meetings',
      content: (
        <Box
          style={{ width: '250px', height: '250px', backgroundColor: 'green' }}
        />
      ),
    },
    {
      title: t('parent.actions.activeCollaborations'),
      icon: <ChecklistIcon />,
      paramRoute: 'collaborations',
      content: (
        <Box
          style={{ width: '250px', height: '250px', backgroundColor: 'yellow' }}
        />
      ),
    },
    {
      title: t('parent.actions.temporaryApplications'),
      icon: <ContactsIcon />,
      paramRoute: 'applications',
      privateTab: true,
      content: (
        <Box
          style={{ width: '250px', height: '250px', backgroundColor: 'blue' }}
        />
      ),
    },
    {
      title: t('parent.actions.history'),
      icon: <HistoryIcon />,
      paramRoute: 'history',
      content: (
        <Box
          style={{ width: '250px', height: '250px', backgroundColor: 'pink' }}
        />
      ),
    },
    {
      title: t('parent.actions.payment'),
      icon: <Payment />,
      paramRoute: 'payment',
      privateTab: true,
      content: (
        <Box
          style={{ width: '250px', height: '250px', backgroundColor: 'orange' }}
        />
      ),
    },
    {
      title: t('parent.actions.settings'),
      icon: <SettingsIcon />,
      paramRoute: 'settings',
      privateTab: true,
      content: <ParentSettings t={t} {...props} avatar={avatar} />,
    },
  ].filter(tab => (user ? (user.uid !== uid ? !tab.privateTab : true) : false));

  useEffect(() => {
    let start = Tabs.findIndex(res => res.paramRoute === currentTab);
    if (start === -1) {
      start = 0;
    }

    setSelectedTab(start);
    setSearchParams(prev => {
      prev.set('tab', Tabs[start].paramRoute || 'info');
      return prev;
    });
  }, [currentTab]);

  const handleSelectedTab = (e: React.SyntheticEvent, newValue: number) => {
    e.preventDefault();

    setSelectedTab(newValue);
    setSearchParams(prev => {
      prev.set('tab', Tabs[newValue].paramRoute || 'info');
      return prev;
    });
  };

  const mobileOverflowFix = device !== 'desktop' ? { width: '100%' } : {};

  return (
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
            <Typography variant="h6">{city}</Typography>
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
          handleSelectedTab={handleSelectedTab}
          tabs={Tabs}
        />
        <Suspense fallback={<LoadingSpinner />}>
          <Box sx={{ width: '100%' }}>{Tabs[selectedTab].content}</Box>
        </Suspense>
      </Stack>
    </Stack>
  );
};
