import { Box, Typography, useTheme } from '@mui/material';

export const Footer = (props: any) => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        ...props.sx,
        width: '100%',
        padding: '1rem',
        backgroundColor: theme.palette.mode === 'dark' ? '#3a3a3a' : '#1976d2',
      }}
    >
      <Typography variant="body2" color="text.secondary" align="center">
        © {new Date().getFullYear()} Network Team (Team 58)
      </Typography>
    </Box>
  );
};
