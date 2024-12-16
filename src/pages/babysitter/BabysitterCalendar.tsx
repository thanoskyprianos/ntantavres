import React, { useState } from 'react';
import { Card, CardHeader, Button, Box, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Edit, Save, SwapVerticalCircleOutlined } from '@mui/icons-material';

interface BabysitterCalendarProps {}

type HandleDateChange = (date: Date | null) => void;

export const BabysitterCalendar: React.FC<BabysitterCalendarProps> = ({}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [changedMonths, setChangedMonths] = useState<string[]>([]);

  const months = [
    'Ιανουάριος', 'Φεβρουάριος', 'Μάρτιος', 'Απρίλιος', 'Μάιος', 'Ιούνιος',
    'Ιούλιος', 'Αύγουστος', 'Σεπτέμβριος', 'Οκτώβριος', 'Νοέμβριος', 'Δεκέμβριος'
  ];

  const initialAvailability = months.reduce((acc, month) => {
    acc[month] = true;
    return acc;
  }, {} as { [key: string]: boolean });

  const [availability, setAvailability] = useState<{ [key: string]: boolean }>(initialAvailability);

  const handleDateChange: HandleDateChange = (date) => {
    setSelectedDate(date);
  };

  const toggleEditMode = () => {
    if (editMode) {
      setOpenDialog(true);
    } else {
      setEditMode(true);
    }
  };

  const toggleAvailability = (month: string) => {
    setAvailability((prev) => ({
      ...prev,
      [month]: !prev[month],
    }));
    setChangedMonths((prev) => {
      if (prev.includes(month)) {
        return prev.filter((m) => m !== month);
      } else {
        return [...prev, month];
      }
    });
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setEditMode(false);
    setChangedMonths([]);
  };

  const renderMonth = (month: string) => {
    const isAvailable = availability[month];
    return (
      <Box
        key={month}
        sx={{
            width: 10,
            padding: 1,
            margin: 1,
            color: 'black',
            border: '2px solid',
            borderColor: isAvailable ? '#b2ff59' : '#ff616f',
            borderStyle: editMode ? 'dashed' : 'solid',
            cursor: editMode ? 'pointer' : 'default',
            backgroundColor: isAvailable ? 'lightgreen' : 'lightcoral',
            flex: '1 1 calc(33.33% - 16px)',
            boxSizing: 'border-box',
        }}
        onClick={() => editMode && toggleAvailability(month)}
      >
        <Typography variant="body1" align="center">{month}</Typography>
      </Box>
    );
  };

  const getChangedMonthsMessage = () => {
    return changedMonths.map((month) => {
      const isAvailable = availability[month];
      return `${month} (${isAvailable ? 'ΔΙΑΘΕΣΙΜΟΣ' : 'ΜΗ ΔΙΑΘΕΣΙΜΟΣ'})`;
    }).join(', ');
  };

  return (
    <div>
      <Card variant="outlined">
        <CardHeader
          title="ΗΜΕΡΟΛΟΓΙΟ ΔΙΑΘΕΣΙΜΟΤΗΤΑΣ"
          action={
            <Button variant="contained" color="primary" onClick={toggleEditMode} startIcon={editMode ? <Save /> : <Edit />}>
              {editMode ? 'Save' : 'Edit'}
            </Button>
          }
        />
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {months.map(renderMonth)}
        </Box>
        <Box sx={{ padding: 2 }}>
          {editMode ? (
            <Typography variant="body2" color="textSecondary" align="center">
              ΑΛΛΑΓΗ ΔΙΑΘΕΣΙΜΟΤΗΤΑΣ
            </Typography>
          ) : (
            <>
              <Typography variant="body2" color="success" align="center">
                *Με πράσινο επισημένονται οι διαθέσιμοι μήνες
              </Typography>
              <Typography variant="body2" color="error" align="center">
                *Με κόκκινο οι μη διαθέσιμοι μήνες
              </Typography>
            </>
          )}
        </Box>
      </Card>
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Επιβεβαίωση αλλαγής διαθεσιμότητας"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Επιβεβαίωση αλλαγής διαθεσιμότητας για τους μήνες: {getChangedMonthsMessage()}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary.contrastText" autoFocus>
            Επιβεβαίωση
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};