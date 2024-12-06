import { createTheme } from '@mui/material';
import { blue } from '@mui/material/colors';

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
    MuiSelect: {
      defaultProps: {
        disableUnderline: true,
      },
    },
  },
  palette: {
    primary: {
      main: blue[400],
      dark: blue[600],
      contrastText: blue[700],
    },
    secondary: {
      main: blue[500],
    },
  },
});
