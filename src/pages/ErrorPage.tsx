import { Button, Paper, Stack, Typography } from '@mui/material';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export const ErrorPage = () => {
  const { t } = useTranslation();

  return (
    <Stack sx={{ placeItems: 'center' }}>
      <Paper sx={{ width: '350px', padding: '15px', borderRadius: '15px' }}>
        <Stack direction="row" sx={{ placeItems: 'center' }} spacing={2}>
          <HeartBrokenIcon
            sx={{ width: '50px', height: '50px', transform: 'scale(1)' }}
          />
          <Typography variant="h5">{t('error.404', 'error')}</Typography>
        </Stack>
        <Stack>
          <Button
            variant="contained"
            sx={{ marginTop: '15px' }}
            component={Link}
            to="/"
          >
            {t('header.home')}
          </Button>
        </Stack>
      </Paper>
    </Stack>
  );
};
