import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { NavTab } from '@components/tabs/TabNav.tsx';
import ChecklistIcon from '@mui/icons-material/Checklist';
import HistoryIcon from '@mui/icons-material/History';
import { Payment } from '@mui/icons-material';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';
import {
  BabysitterInfo,
  BabysitterSettings,
  ParentInfo,
  ParentSettings,
} from '@/routing/lazy.tabs.ts';
import { TabBox } from './TabBox.tsx';
import { Meetings } from '@components/tabs/common/Meetings.tsx';
import { Collaborations } from '@components/tabs/common/Collaborations.tsx';
import { Payments } from '@components/tabs/common/Payments.tsx';

export const ProfileTabs: NavTab[] = [
  {
    title: 'parent.info.title',
    icon: <InfoIcon />,
    paramRoute: 'info',
    role: 'PARENT',
    content: <ParentInfo />,
  },
  {
    title: 'babysitter.info.title',
    icon: <InfoIcon />,
    paramRoute: 'info',
    role: 'BABYSITTER',
    content: <BabysitterInfo />,
  },
  {
    title: 'parent.actions.appointments',
    icon: <CalendarMonthIcon />,
    paramRoute: 'appointments',
    role: 'BOTH',
    content: (
      <TabBox variant="meetings">
        <Meetings />
      </TabBox>
    ),
    requiresAuth: true,
  },
  {
    title: 'parent.actions.activeCollaborations',
    icon: <ChecklistIcon />,
    paramRoute: 'collaborations',
    role: 'BOTH',
    content: (
      <TabBox variant="collaborations">
        <Collaborations />
      </TabBox>
    ),
    requiresAuth: true,
  },
  {
    title: 'parent.actions.payments',
    icon: <Payment />,
    paramRoute: 'payments',
    privateTab: true,
    role: 'BOTH',
    content: (
      <TabBox variant="payment">
        <Payments />
      </TabBox>
    ),
  },
  {
    title: 'parent.actions.history',
    icon: <HistoryIcon />,
    paramRoute: 'history',
    role: 'BOTH',
    content: <TabBox variant="history" />,
    requiresAuth: true,
  },
  {
    title: 'parent.actions.settings',
    icon: <SettingsIcon />,
    paramRoute: 'settings',
    privateTab: true,
    role: 'PARENT',
    content: <ParentSettings />,
  },
  {
    title: 'parent.actions.settings',
    icon: <SettingsIcon />,
    paramRoute: 'settings',
    privateTab: true,
    role: 'BABYSITTER',
    content: <BabysitterSettings />,
  },
];
