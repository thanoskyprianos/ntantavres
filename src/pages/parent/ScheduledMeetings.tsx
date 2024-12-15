import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Stack, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { green, red } from '@mui/material/colors';
import EventBusy from '@mui/icons-material/EventBusy';
import { AccountBox, PowerOffOutlined } from '@mui/icons-material';

const scheduledMeetings = [
  { name: 'Maria Papadopoulou', date: '2023-10-01', time: '10:00 AM', typeOfDuty: 'Πλήρης' },
  { name: 'Ioanna Georgiou', date: '2023-10-05', time: '2:00 PM', typeOfDuty: 'Πλήρης' },
  { name: 'Eleni Nikolaou', date: '2023-10-10', time: '11:00 AM', typeOfDuty: 'Μερική' },
];

export const ScheduledMeetings = () => {
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
          Προγραμματισμένες Συναντήσεις
        </Typography>
        {scheduledMeetings.map((meeting, index) => (
          <Card key={index} variant="outlined" sx={{ borderColor: green[500], borderWidth: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h6" component="div" textAlign="center">
                  {meeting.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" textAlign="center">
                  Ημερομηνία: {meeting.date}
                </Typography>
                <Typography variant="body2" color="text.secondary" textAlign="center">
                  Ώρα: {meeting.time}
                </Typography>
                <Typography variant="body2" color="text.secondary" textAlign="center">
                  Τύπος Απασχόλησης: {meeting.typeOfDuty}
                </Typography>
                <Stack direction={'row'} spacing={2} sx={{marginTop: '10px'}}>
                    <Button startIcon={<AccountBox />} variant="contained" color="primary" sx={{ mt: 2 }}>
                    ΠΡΟΦΙΛ ΕΠΑΓΓΕΛΜΑΤΙΑ
                    </Button>
                    <Button startIcon={<EventBusy />} variant="outlined" color="error" sx={{ mt: 2 }} onClick={handleClickOpen}>
                    ΑΚΥΡΩΣΗ ΡΑΝΤΕΒΟΥ
                    </Button>
                </Stack>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Stack>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Ακύρωση Ραντεβού</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Επιβεβαίωση Ακύρωσης Ραντεβού
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="success">
            ΠΙΣΩ
          </Button>
          <Button onClick={handleClose} color="error" autoFocus>
            ΑΚΥΡΩΣΗ ΡΑΝΤΕΒΟΥ
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ScheduledMeetings;