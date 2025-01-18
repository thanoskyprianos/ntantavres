import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, Stack, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { green, red } from '@mui/material/colors';
import EventBusy from '@mui/icons-material/EventBusy';
import { AccountBox, PowerOffOutlined } from '@mui/icons-material';
import { collection, query, where, getDocs, setDoc, doc, deleteDoc, getDoc } from 'firebase/firestore';
import { db } from '@config/firebase.ts';
import { useAuthContext } from '@/context/AuthProvider';
import { Meeting, State } from '@/types/Meeting';

const scheduledMeetings = [
  {
    name: 'Maria Papadopoulou',
    place: null, // Replace with actual place if applicable
    location: null, // Replace with actual location if applicable
    dateTime: new Date('2023-10-01T10:00:00'),
    interestedFor: null, // Provide a valid key of MonthAvailability if applicable
    uidb: 'Ya8VzligEOW5cE99BAAUy7dOyYQ2', // Babysitter ID
    state: undefined, // Replace with the appropriate state if applicable
    creation: new Date(),
    meetingId: '', // Will be dynamically generated
  },
  {
    name: 'Ioanna Georgiou',
    place: null,
    location: null,
    dateTime: new Date('2023-10-05T14:00:00'),
    interestedFor: null,
    uidb: 'XlAtv3kIGYPjGC0UmWlovifjlcF3',
    state: undefined,
    creation: new Date(),
    meetingId: '',
  },
  {
    name: 'Eleni Nikolaou',
    place: null,
    location: null,
    dateTime: new Date('2023-10-10T11:00:00'),
    interestedFor: null,
    uidb: 'F5CHZN5NfxOb6OrQGvwmGtJiF793',
    state: undefined,
    creation: new Date(),
    meetingId: '',
  },
];

export const ScheduledMeetings = () => {
  const [open, setOpen] = useState(false);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const { user } = useAuthContext();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const initializeMeetings = async () => {
      try {
        const userId = user?.uid; // Get the string UID from the user
        if (!userId) {
          console.error('User ID is missing.');
          return;
        }
  
        const meetingsRef = collection(db, 'meetings');
        const usersRef = collection(db, 'users');
        const q = query(meetingsRef, where('uida', '==', userId));
        const querySnapshot = await getDocs(q);
  
        if (querySnapshot.empty) {
          // No meetings found; initialize with default meetings
          const batch = scheduledMeetings.map((meeting) => ({
            ...meeting,
            uida: userId,
            creation: new Date(),
          }));
  
          const promises = batch.map(async (m) => {
            const userDoc = await getDoc(doc(usersRef, m.uidb));
            const userData = userDoc.exists() ? userDoc.data() : {};
            const meetingWithName = { ...m, name: userData.name || 'Unknown', meetingId: doc(meetingsRef).id };
            return setDoc(doc(meetingsRef), meetingWithName);
          });
          await Promise.all(promises);
          setMeetings(batch as Meeting[]);
        } else {
          // Load existing meetings
          const meetingsData = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            meetingId: doc.id,
          }));
          setMeetings(meetingsData as Meeting[]);
        }
      } catch (error) {
        console.error('Error initializing meetings:', error);
      }
    };
  
    initializeMeetings();
  }, [user]);
  

  const cancelMeeting = async (meetingId: string) => {
    try {
      await deleteDoc(doc(db, 'meetings', meetingId));
      setMeetings((prev) => prev.filter((meeting) => meeting.meetingId !== meetingId));
    } catch (error) {
      console.error('Error cancelling meeting:', error);
    }
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
                  Ημερομηνία: {meeting.dateTime.toLocaleDateString('el-GR')}
                </Typography>
                <Typography variant="body2" color="text.secondary" textAlign="center">
                  Ώρα: {meeting.dateTime.toLocaleTimeString('el-GR')}
                </Typography>
                <Stack direction={'row'} spacing={2} sx={{ marginTop: '10px' }}>
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