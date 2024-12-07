import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  SelectProps,
  Stack,
  Typography,
} from '@mui/material';
import { ReactElement, ReactNode } from 'react';

interface IconLabelSelectProps {
  icon: ReactElement;
  options: string[];
  variant?: string;
  value?: string;
  handleChange?:
    | ((event: SelectChangeEvent<string>, child: ReactNode) => void)
    | undefined;
  valueFormat?: (value: string) => string;
  optionFormat?: (value: string) => string;
}

export const IconLabelSelect = ({
  icon,
  options,
  value,
  handleChange,
  variant = 'filled',
  valueFormat,
  optionFormat,
  ...rest
}: IconLabelSelectProps & SelectProps) => {
  return (
    <FormControl>
      <Select
        variant={variant}
        sx={{ ...rest.sx }}
        hiddenLabel
        value={value}
        onChange={handleChange}
        renderValue={value => {
          return (
            <Stack direction="row">
              {icon}
              <Typography>
                {valueFormat ? valueFormat(value) : value}
              </Typography>
            </Stack>
          );
        }}
      >
        {options.map(option => (
          <MenuItem value={option} key={option}>
            {optionFormat ? optionFormat(option) : option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
