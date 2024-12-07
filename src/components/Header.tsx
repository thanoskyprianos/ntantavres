import HelpIcon from '@mui/icons-material/Help';
import PersonIcon from '@mui/icons-material/Person2';
import WorkIcon from '@mui/icons-material/Work';
import { Divider, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { UserHeart } from '../assets/UserHeart';
import { IconLabelButton } from './IconLabelButton';
import { NtantaVresButton } from './NtantaVresButton';
import { useTranslation } from 'react-i18next';
import { LanguageSelect } from './LanguageSelect.tsx';

export const Header = () => {
  const { t } = useTranslation();

  return (
    <Stack
      direction="row"
      sx={{
        justifyContent: 'space-between',
        backgroundColor: 'secondary.main',
        padding: '10px',
      }}
    >
      <Stack
        direction="row"
        spacing={1}
        divider={<Divider orientation="vertical" flexItem />}
      >
        <NtantaVresButton />
        <Stack direction="row" spacing={1}>
          <IconLabelButton
            icon={<UserHeart />}
            label={t('header.parent')}
            sx={{ borderRadius: '15px' }}
            component={Link}
            to="/parent"
          />
          <IconLabelButton
            icon={<WorkIcon />}
            label={t('header.babysitter')}
            sx={{ borderRadius: '15px' }}
            component={Link}
            to="/babysitter"
          />
        </Stack>
      </Stack>
      <Stack direction="row" spacing={1}>
        <LanguageSelect />
        <IconLabelButton
          icon={<HelpIcon />}
          label={t('header.questions')}
          sx={{ padding: '0 10px', borderRadius: '15px' }}
        />
        <IconLabelButton
          icon={<PersonIcon />}
          // TODO: CONDITIONALLY RENDER
          label={t('header.login')}
          sx={{ borderRadius: '15px' }}
        />
      </Stack>
    </Stack>
  );
};
