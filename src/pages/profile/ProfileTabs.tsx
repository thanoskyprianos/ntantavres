import { Box } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { NavTab } from '@components/tabs/TabNav.tsx';
import ChecklistIcon from '@mui/icons-material/Checklist';
import ContactsIcon from '@mui/icons-material/Contacts';
import HistoryIcon from '@mui/icons-material/History';
import { Payment } from '@mui/icons-material';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';
import { ParentInfo, ParentSettings } from '@/routing/lazy.tabs.ts';

export const ProfileTabs: NavTab[] = [
  {
    title: 'parent.info.title',
    icon: <InfoIcon />,
    paramRoute: 'info',
    role: 'PARENT',
    content: <ParentInfo />,
  },
  {
    title: 'parent.actions.plannedMeetings',
    icon: <CalendarMonthIcon />,
    paramRoute: 'meetings',
    role: 'BOTH',
    content: (
      <Box
        style={{ width: '250px', height: '250px', backgroundColor: 'green' }}
      />
    ),
  },
  {
    title: 'parent.actions.activeCollaborations',
    icon: <ChecklistIcon />,
    paramRoute: 'collaborations',
    role: 'BOTH',
    content: (
      <Box
        style={{ width: '250px', height: '250px', backgroundColor: 'yellow' }}
      />
    ),
  },
  {
    title: 'parent.actions.temporaryApplications',
    icon: <ContactsIcon />,
    paramRoute: 'applications',
    privateTab: true,
    role: 'PARENT',
    content: (
      <Box
        style={{ width: '250px', height: '250px', backgroundColor: 'blue' }}
      />
    ),
  },
  {
    title: 'parent.actions.history',
    icon: <HistoryIcon />,
    paramRoute: 'history',
    role: 'BOTH',
    content: (
      <Box
        style={{ width: '250px', height: '250px', backgroundColor: 'pink' }}
      />
    ),
  },
  {
    title: 'parent.actions.payment',
    icon: <Payment />,
    paramRoute: 'payment',
    privateTab: true,
    role: 'BOTH',
    content: (
      <Box
        style={{ width: '250px', height: '250px', backgroundColor: 'orange' }}
      />
    ),
  },
  {
    title: 'parent.actions.settings',
    icon: <SettingsIcon />,
    paramRoute: 'settings',
    privateTab: true,
    role: 'BOTH',
    content: <ParentSettings />,
  },
];
