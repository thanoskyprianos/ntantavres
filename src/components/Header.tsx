import HelpIcon from '@mui/icons-material/Help';
import PersonIcon from '@mui/icons-material/Person2';
import WorkIcon from '@mui/icons-material/Work';
import { AppBar, Divider, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { UserHeart } from '../assets/UserHeart';
import { IconLabelButton } from './IconLabelButton';
import { useTranslation } from 'react-i18next';
import HomeIcon from '@mui/icons-material/Home';
import { DeviceUsed, useDeviceDetect } from '../hooks/useDeviceDetect.hook.ts';
import { IconLabelSelect } from './IconLabelSelect.tsx';
import LanguageIcon from '@mui/icons-material/Language';
import { langs, langsMap } from '../config/i18n.ts';
import { TFunction } from 'i18next';
import { useColorScheme } from '@mui/material/styles';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useAuth } from '../hooks/useAuth.hook.ts';
import { useEffect } from 'react';

interface PartOfHeaderProps {
  device: DeviceUsed;
  t: TFunction;
}

interface HomePageIconProps {
  device: DeviceUsed;
}

const commonTheme = {
  borderRadius: '25px',
  backgroundColor: 'transparent',
  '&:hover': {
    backgroundColor: 'primary.dark',
  },
};

const HomePageIcon = ({ device }: HomePageIconProps) => {
  return (
    <IconLabelButton
      label="NtantaVres"
      icon={<HomeIcon />}
      component={Link}
      to="/"
      sx={{
        textTransform: 'none',
        ...commonTheme,
      }}
      direction={device === 'desktop' ? 'row' : 'column'}
    />
  );
};

const MainServicesButtons = ({ device, t }: PartOfHeaderProps) => {
  return (
    <Stack direction="row" spacing={0.5}>
      <IconLabelButton
        icon={<UserHeart />}
        label={t('header.parent')}
        sx={commonTheme}
        component={Link}
        to="/parent"
        direction={device === 'desktop' ? 'row' : 'column'}
      />
      <IconLabelButton
        icon={<WorkIcon />}
        label={t('header.babysitter')}
        sx={commonTheme}
        component={Link}
        to="/babysitter"
        direction={device === 'desktop' ? 'row' : 'column'}
      />
    </Stack>
  );
};

const LeftPartOfHeader = ({ device, t }: PartOfHeaderProps) => {
  return (
    <Stack
      direction="row"
      spacing={1}
      divider={
        device !== 'mobile' && <Divider orientation="vertical" flexItem />
      }
    >
      <HomePageIcon device={device} />
      <MainServicesButtons device={device} t={t} />
    </Stack>
  );
};

const ThemeAndLanguage = () => {
  const { mode, systemMode, setMode } = useColorScheme();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (mode === 'system') {
      setMode(systemMode || null);
    }
  }, [mode]);

  return (
    <Stack direction="row" spacing={1}>
      <IconLabelButton
        label={''}
        icon={mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
        sx={commonTheme}
        showLabel={false}
        onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
      />
      <IconLabelSelect
        icon={<LanguageIcon sx={{ paddingRight: '5px' }} />}
        options={langs}
        sx={{
          height: '50px',
          color: 'primary.contrastText', // for some reason not set by theme
          '.MuiSvgIcon-root': {
            color: 'inherit',
          },
          ...commonTheme,
        }}
        label={i18n.resolvedLanguage}
        handleChange={e => i18n.changeLanguage(e.target.value)}
        valueFormat={(value: string) => value.substring(3)}
        optionFormat={(option: string) => langsMap.get(option) || 'Unknown'}
      />
    </Stack>
  );
};

const QuestionsAndProfile = ({ device, t }: PartOfHeaderProps) => {
  const { user } = useAuth();

  return (
    <Stack direction="row">
      <IconLabelButton
        icon={<HelpIcon />}
        label={t('header.questions')}
        sx={commonTheme}
        showLabel={device === 'desktop'}
        component={Link}
        to="/questions"
      />
      <IconLabelButton
        icon={<PersonIcon />}
        label={user ? t('header.profile') : t('header.login')}
        sx={commonTheme}
        showLabel={device === 'desktop'}
        component={Link}
        to="/auth"
      />
    </Stack>
  );
};

const RightPartOfHeader = ({ device, t }: PartOfHeaderProps) => {
  return (
    <Stack
      direction="row"
      spacing={1}
      divider={
        device !== 'mobile' && <Divider orientation="vertical" flexItem />
      }
    >
      <ThemeAndLanguage />
      <QuestionsAndProfile device={device} t={t} />
    </Stack>
  );
};

export const Header = () => {
  const { t } = useTranslation();
  const { device } = useDeviceDetect();

  return (
    <AppBar position="sticky" sx={{ bgcolor: 'primary.main' }}>
      <Stack
        direction="row"
        sx={{
          justifyContent: device === 'mobile' ? 'center' : 'space-between',
          padding: '10px',
          flexWrap: 'wrap',
        }}
      >
        <LeftPartOfHeader device={device} t={t} />
        <RightPartOfHeader device={device} t={t} />
      </Stack>
    </AppBar>
  );
};
