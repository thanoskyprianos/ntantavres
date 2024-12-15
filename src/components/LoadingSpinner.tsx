import { CircularProgress, Stack } from '@mui/material';

export const LoadingSpinner = (props: any) => {
  return (
    <Stack sx={{ ...props.sx, placeItems: 'center' }}>
      <CircularProgress />
    </Stack>
  );
};
