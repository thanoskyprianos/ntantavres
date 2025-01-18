import React from 'react';
import { Button, useTheme, Typography, Autocomplete, TextField, Box, Stack, Slider } from '@mui/material';
import { SearchBar } from '../SearchBar';
import AdSearchComponent from './SearchBabysitter';

export const ParentPage = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  return (
    
    <Box sx={{ padding: 2, width: '300px', marginLeft: '10px', marginRight: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Εύρεση Νταντάς
      </Typography>
      <AdSearchComponent />

    </Box>
  );
};