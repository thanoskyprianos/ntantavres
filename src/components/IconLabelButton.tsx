import { Button, ButtonProps, Stack } from '@mui/material';
import { ReactElement } from 'react';
import { To } from 'react-router-dom';

interface IconLabelButtonProps extends ButtonProps {
  label: string;
  icon: ReactElement;
  to?: To;
}

export const IconLabelButton = ({
  label,
  icon,
  ...rest
}: IconLabelButtonProps) => {
  return (
    <Button variant="contained" {...rest}>
      <Stack
        direction="column"
        spacing="1"
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {icon}
        <p>{label}</p>
      </Stack>
    </Button>
  );
};
