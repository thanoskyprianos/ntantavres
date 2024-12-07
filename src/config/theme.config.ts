import { createTheme } from '@mui/material';

export const theme = createTheme({
  colorSchemes: {
    light: {},
    dark: {},
  },
  typography: {
    fontFamily: 'Ubuntu Mono',
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiSelect: {
      defaultProps: {
        disableUnderline: true,
      },
    },
  },
});
