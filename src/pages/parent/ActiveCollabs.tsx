import React from 'react';
import { Card, CardContent, Typography, Box, Stack, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { green } from '@mui/material/colors';
import { AccountBox, Edit } from '@mui/icons-material';

const activeCollabs = [
  { name: 'Maria Papadopoulou', duration: '3 μήνες', typeOfDuty: 'Πλήρης' },
  { name: 'Ioanna Georgiou', duration: '6 μήνες', typeOfDuty: 'Πλήρης' },
  { name: 'Eleni Nikolaou', duration: '1 έτος', typeOfDuty: 'Μερική' },
];

export const ActiveCollabs = () => {
  return (
    <Box sx={{ padding: 2, display: 'flex', justifyContent: 'center' }}>
      <Stack spacing={2} sx={{ width: '100%', maxWidth: 440 }}>
        <Typography variant="h4" gutterBottom textAlign="center">
          Ενεργές Συνεργασίες
        </Typography>
        {activeCollabs.map((collab, index) => (
          <Card key={index} variant="outlined" sx={{ borderColor: green[500], borderWidth: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h6" component="div" textAlign="center">
                  {collab.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" textAlign="center">
                  Διάρκεια συμφωνίας: {collab.duration}
                </Typography>
                <Typography variant="body2" color="text.secondary" textAlign="center">
                  Τύπος Απασχόλησης: {collab.typeOfDuty}
                </Typography>
                <Stack direction={'row'} spacing={2} sx={{marginTop: '10px'}}>
                  <Button startIcon={<AccountBox />} variant="contained" color="primary" sx={{ mt: 2 }}>
                    ΠΡΟΦΙΛ ΕΠΑΓΓΕΛΜΑΤΙΑ
                  </Button>
                  <Button 
                  component={Link}
                  to='/parent/editCollab'
                  startIcon={<Edit />} variant="outlined" sx={{ mt: 2, color: 'secondary.contrastText' }}>
                    ΠΡΟΒΟΛΗ ΕΝΕΡΓΕΙΩΝ
                  </Button>
                </Stack>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};