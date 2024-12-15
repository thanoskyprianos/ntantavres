import { CircularProgress, Stack, SxProps, Theme } from '@mui/material';

interface LoadingSpinnerProps {
  sx?: SxProps<Theme>;
  size?: string;
}

export const LoadingSpinner = ({ sx, size }: LoadingSpinnerProps) => {
  return (
    <Stack sx={{ ...sx, placeItems: 'center' }}>
      <CircularProgress size={size} />
    </Stack>
  );
};
