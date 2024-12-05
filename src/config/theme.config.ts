import { createTheme } from '@mui/material';
import { blue, lightBlue } from '@mui/material/colors';

export const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
  typography: {
    fontFamily: 'Ubuntu Mono',
  },
  components: {
    MuiButton: {
      defaultProps: {
        // disableRipple: true,
        disableElevation: true,
      },
    },
  },
  palette: {
    primary: {
      main: blue[400],
      dark: blue[600],
      contrastText: lightBlue[50],
    },
    secondary: {
      main: blue[500],
    },
  },
});
