import HomeIcon from '@mui/icons-material/Home';
import { Button, Stack } from '@mui/material';
import { Dispatch, useState } from 'react';
import { Link } from 'react-router-dom';
import { IconLabelButton } from './IconLabelButton';

export const NtantaVresButton = () => {
  const [isHovering, setIsHovering]: [boolean, Dispatch<boolean>] =
    useState(false);

  return (
    <Stack direction="row" spacing={0.5} sx={{ flexWrap: 'nowrap' }}>
      <Button
        component={Link}
        to={'/'}
        variant="contained"
        onClick={() => console.log('Hello, world!')}
        sx={{
          // fontFamily: 'Ubuntu Mono',
          borderRadius: '15px 0 0 15px',
          textTransform: 'none',
          fontSize: 20,
          bgcolor: isHovering ? 'primary.dark' : 'primary.main',
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        NtantaVres
      </Button>

      <IconLabelButton
        component={Link}
        to={'/'}
        variant="contained"
        sx={{
          borderRadius: '0 15px 15px 0',
          marginLeft: '2px',
          bgcolor: isHovering ? 'primary.dark' : 'primary.main',
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        icon={<HomeIcon />}
        label="ΑΡΧΙΚΗ"
      ></IconLabelButton>
    </Stack>
  );
};
