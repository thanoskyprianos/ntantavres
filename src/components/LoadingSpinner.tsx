import { CircularProgress, Stack } from '@mui/material';

export const LoadingSpinner = () => {
  return (
    <Stack sx={{ placeItems: 'center' }}>
      <CircularProgress />
    </Stack>
  );
};
