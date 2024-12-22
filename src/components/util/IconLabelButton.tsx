import { Button, ButtonProps, Stack, Typography } from '@mui/material';
import { ReactElement } from 'react';
import { To } from 'react-router-dom';
import { styled } from '@mui/material/styles';

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
    <Button variant="contained" {...rest} sx={{ ...rest.sx }}>
      <Stack
        direction={direction}
        sx={{
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

export const ActionButton = styled(IconLabelButton)({
  height: '30px',
  justifyContent: 'start',
});
