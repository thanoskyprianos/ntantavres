import React from 'react';
import { Divider, Button, useTheme, Typography, Autocomplete, TextField, Box, Stack } from '@mui/material';
import { SearchBar } from '../SearchBar';
import AdSearchComponent from './SearchParent';


export const BabysitterPage = () => {

  return (
  <Box sx={{ padding: 2, width: '300px', marginLeft: '10px', marginRight: 'auto' }}>
    <Typography variant="h4" gutterBottom>
      Εύρεση αγγελίας
    </Typography>
    <AdSearchComponent />
  </Box>
  );
};