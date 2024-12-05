import WorkIcon from '@mui/icons-material/Work';
import { Divider, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { UserHeart } from '../assets/UserHeart';
import { IconLabelButton } from './IconLabelButton';
import { NtantaVresButton } from './NtantaVresButton';

export const Header = () => {
  return (
    <>
      <Stack>
        <Stack
          direction="row"
          spacing={1}
          sx={{ flexWrap: 'wrap' }}
          divider={<Divider orientation="vertical" flexItem />}
        >
          <NtantaVresButton />
          <Stack direction="row" spacing={1}>
            <IconLabelButton
              icon={<UserHeart />}
              label="ΓΟΝΕΑΣ"
              sx={{ borderRadius: '15px' }}
              component={Link}
              to="/parent"
            />
            <IconLabelButton
              icon={<WorkIcon />}
              label="ΝΤΑΝΤΑ"
              sx={{ borderRadius: '15px' }}
              component={Link}
              to="/babysitter"
            />
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};
