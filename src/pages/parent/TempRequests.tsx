import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Stack, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { green, red, yellow } from '@mui/material/colors';
import EventBusy from '@mui/icons-material/EventBusy';
import { AccountBox, Clear, PowerOffOutlined } from '@mui/icons-material';

const pendingRequests = [
  { name: 'Maria Papadopoulou', duration: '3 μήνες', typeOfDuty: 'Πλήρης' },
  { name: 'Ioanna Georgiou', duration: '6 μήνες', typeOfDuty: 'Πλήρης' },
  { name: 'Eleni Nikolaou', duration: '1 έτος', typeOfDuty: 'Μερική' },
];

export const TempRequests = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box sx={{ padding: 2, display: 'flex', justifyContent: 'center' }}>
      <Stack spacing={2} sx={{ width: '100%', maxWidth: 440 }}>
        <Typography variant="h4" gutterBottom textAlign="center">
          Εκκρεμείς Αιτήσεις
        </Typography>
        {pendingRequests.map((request, index) => (
          <Card key={index} variant="outlined" sx={{ borderColor: yellow[700], borderWidth: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h6" component="div" textAlign="center">
                  {request.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" textAlign="center">
                  Διάρκεια συμφωνίας: {request.duration}
                </Typography>
                <Typography variant="body2" color="text.secondary" textAlign="center">
                  Τύπος Απασχόλησης: {request.typeOfDuty}
                </Typography>
                <Stack direction={'row'} spacing={2} sx={{marginTop: '10px'}}>
                    <Button startIcon={<AccountBox />} variant="contained" color="primary" sx={{ mt: 2 }}>
                      ΠΡΟΦΙΛ ΕΠΑΓΓΕΛΜΑΤΙΑ
                    </Button>
                    <Button startIcon={<Clear />} variant="outlined" color="error" sx={{ mt: 2 }} onClick={handleClickOpen}>
                      ΑΚΥΡΩΣΗ ΑΙΤΗΣΗΣ
                    </Button>
                </Stack>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Stack>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Ακύρωση Αίτησης</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Επιβεβαίωση Ακύρωσης Αίτησης
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button onClick={handleClose} color="success">
            ΠΙΣΩ
          </Button>
          <Button onClick={handleClose} color="error" autoFocus>
            ΑΚΥΡΩΣΗ ΑΙΤΗΣΗΣ
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};