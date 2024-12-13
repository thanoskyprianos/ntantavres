import { TextField, TextFieldProps } from '@mui/material';

export const TextFieldSmall = (props: TextFieldProps) => {
  return <TextField size="small" {...props} sx={{ width: '100%' }} />;
};
