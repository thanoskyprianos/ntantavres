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
import { langs } from '../config/i18n.ts';
import i18n, { TFunction } from 'i18next';

interface PartOfHeaderProps {
  device: DeviceUsed;
  t: TFunction;
}

interface HomePageIconProps {
  device: DeviceUsed;
}

const HomePageIcon = ({ device }: HomePageIconProps) => {
  return (
    <IconLabelButton
      label="NtantaVres"
      icon={<HomeIcon />}
      component={Link}
      to="/"
      sx={{
        textTransform: 'none',
        borderRadius: '25px',
      }}
      direction={device === 'desktop' ? 'row' : 'column'}
    />
  );
};

const MainServicesButtons = ({ device, t }: PartOfHeaderProps) => {
  return (
    <Stack direction="row">
      <IconLabelButton
        icon={<UserHeart />}
        label={t('header.parent')}
        sx={{ borderRadius: '25px' }}
        component={Link}
        to="/parent"
        direction={device === 'desktop' ? 'row' : 'column'}
      />
      <IconLabelButton
        icon={<WorkIcon />}
        label={t('header.babysitter')}
        sx={{ borderRadius: '25px' }}
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
      divider={<Divider orientation="vertical" flexItem />}
    >
      <HomePageIcon device={device} />
      <MainServicesButtons device={device} t={t} />
    </Stack>
  );
};

const RightPartOfHeader = ({ device, t }: PartOfHeaderProps) => {
  return (
    <Stack direction="row">
      <IconLabelSelect
        icon={<LanguageIcon sx={{ paddingRight: '5px' }} />}
        options={langs}
        sx={{
          height: '50px',
          borderRadius: '25px',
          color: 'primary.contrastText', // for some reason not set by theme
          backgroundColor: 'primary.main',
          '.MuiSvgIcon-root': {
            color: 'inherit',
          },
          '&:hover': {
            backgroundColor: 'primary.dark',
          },
        }}
        value={i18n.resolvedLanguage}
        handleChange={e => i18n.changeLanguage(e.target.value)}
        valueFormat={(value: string) => value.substring(3)}
        optionFormat={(option: string) => t(`languages:language.${option}`)}
      />
      <IconLabelButton
        icon={<HelpIcon />}
        label={t('header.questions')}
        sx={{ padding: '0 10px', borderRadius: '25px' }}
        showLabel={device === 'desktop'}
      />
      <IconLabelButton
        icon={<PersonIcon />}
        // TODO: CONDITIONALLY RENDER
        label={t('header.login')}
        sx={{ borderRadius: '25px' }}
        showLabel={device === 'desktop'}
      />
    </Stack>
  );
};

export const Header = () => {
  const { t } = useTranslation();
  const { device } = useDeviceDetect();

  return (
    <AppBar position="sticky">
      <Stack
        direction="row"
        sx={{
          justifyContent: {
            xs: 'space-evenly',
            sm: 'space-between',
          },
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
