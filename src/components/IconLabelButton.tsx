import { Button, ButtonProps, Stack, Typography } from '@mui/material';
import { ReactElement } from 'react';
import { To } from 'react-router-dom';

interface IconLabelButtonProps extends ButtonProps {
  showLabel?: boolean;
  label: string;
  icon: ReactElement;
  to?: To;
  direction?: 'row' | 'column';
}

export const IconLabelButton = ({
  showLabel = true,
  label,
  icon,
  direction = 'row',
  ...rest
}: IconLabelButtonProps) => {
  return (
    <Button variant="contained" {...rest} sx={{ ...rest.sx, height: '50px' }}>
      <Stack
        direction={direction}
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {icon}
        {showLabel && (
          <Typography
            variant="subtitle2"
            sx={{ marginLeft: '5px', textWrap: 'nowrap' }}
          >
            {label}
          </Typography>
        )}
      </Stack>
    </Button>
  );
};
