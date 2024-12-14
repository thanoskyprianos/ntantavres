import React from 'react';
import { Box, Typography, Divider, useTheme } from '@mui/material';

export const Footer: React.FC = () => {
  const theme = useTheme();
  
  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        padding: '1rem',
        marginTop: 'auto',
        backgroundColor: theme.palette.mode === 'dark' ? '#3a3a3a' : '#1976d2',
        position: 'fixed',
        bottom: 0,
      }}
    >
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
      >
        © {2024} Network Team (Team 58)
      </Typography>
    </Box>
  );
};