import React, { useEffect, useState } from 'react';
import { UserDetails } from '@/types/UserDetails.ts';
import { useTranslation } from 'react-i18next';
import { Base64String } from '@/types/Avatar.ts';
import { Box, Stack, Typography } from '@mui/material';
import { AvatarDisplay } from '@components/util/AvatarDisplay.tsx';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { NavTab } from '@components/tabs/TabNav.tsx';
import ChecklistIcon from '@mui/icons-material/Checklist';
import ContactsIcon from '@mui/icons-material/Contacts';
import HistoryIcon from '@mui/icons-material/History';
import { Payment } from '@mui/icons-material';
import { useDeviceDetect } from '@hooks/useDeviceDetect.hook.ts';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';
import { ProfileNav } from '@components/tabs/ProfileNav.tsx';
import { ParentInfo } from '@components/tabs/parent/ParentInfo.tsx';
import { ParentSettings } from '@components/tabs/parent/ParentSettings.tsx';

interface ParentProfilePageProps extends UserDetails {
  avatar?: Base64String;
}

export const ParentProfilePage = (props: ParentProfilePageProps) => {
  const { firstName, lastName, avatar } = props;

  const { t } = useTranslation();
  const navigate = useNavigate();
  const { device } = useDeviceDetect();

  const [selectedTab, setSelectedTab] = useState(0);
  const [searchParams] = useSearchParams();
  const currentTab = searchParams.get('tab');

  const Tabs: NavTab[] = [
    {
      title: t('parent.info.title'),
      icon: <InfoIcon />,
      paramRoute: 'info',
      content: (
        // <Box
        //   sx={{ width: '1000px', height: '250px', backgroundColor: 'red' }}
        // />
        <ParentInfo t={t} {...props} />
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
      content: <ParentSettings t={t} {...props} />,
    },
  ];

  useEffect(() => {
    let start = Tabs.findIndex(res => res.paramRoute === currentTab);
    if (start === -1) {
      start = 0;
    }

    setSelectedTab(start);

    const other = Array.from(searchParams.entries())
      .filter(([key]) => key !== 'tab')
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
    navigate(
      `${location.pathname}?tab=${Tabs[start].paramRoute}${other ? '&' + other : ''}`
    );
  }, []);

  const handleSelectedTab = (e: React.SyntheticEvent, newValue: number) => {
    e.preventDefault();

    setSelectedTab(newValue);

    const other = Array.from(searchParams.entries())
      .filter(([key]) => key !== 'tab')
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
    navigate(
      `${location.pathname}?tab=${Tabs[newValue].paramRoute}${other ? '&' + other : ''}`
    );
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const mobileOverflowFix = device !== 'desktop' ? { width: '100%' } : {};

  // return (
  //   <div>
  //     <Stack
  //       direction="column"
  //       spacing={3}
  //       sx={{
  //         justifyContent: 'center',
  //         alignItems: 'center',
  //       }}
  //     >
  //       <Stack direction="row" spacing={2}>

  //

  //
  //         <Dialog open={open} onClose={handleClose}>
  //           <DialogTitle>{t('parent.babysitterAd.createTitle')}</DialogTitle>
  //           <DialogContent>
  //             <DialogContentText>
  //               {t('parent.babysitterAd.prompt')}
  //             </DialogContentText>
  //           </DialogContent>
  //           <DialogActions>
  //             <Button
  //               onClick={handleClose}
  //               component={Link}
  //               to="/parent/createORedit"
  //               sx={{ color: 'secondary.contrastText' }}
  //             >
  //               {t('parent.babysitterAd.ok')}
  //             </Button>
  //           </DialogActions>
  //         </Dialog>
  //       </Stack>
  //     </Stack>
  //   </div>
  // );

  return (
    <Stack sx={{ placeItems: 'center' }} spacing={2}>
      <Stack direction="row" spacing={1}>
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
          <Typography variant="h3">
            {firstName} {lastName}
          </Typography>
          <Typography variant="h6">to be changed</Typography>
        </Stack>
      </Stack>
      <Stack
        direction={device === 'desktop' ? 'row' : 'column'}
        spacing={1}
        sx={{
          width: '75%',
          padding: '0 15px',
          [device === 'desktop' ? 'alignItems' : 'placeContent']: 'start',
          ...mobileOverflowFix,
        }}
      >
        <ProfileNav
          selectedTab={selectedTab}
          handleSelectedTab={handleSelectedTab}
          tabs={Tabs}
        />
        <Box sx={{ width: '100%' }}>{Tabs[selectedTab].content}</Box>
      </Stack>
    </Stack>
  );
};
