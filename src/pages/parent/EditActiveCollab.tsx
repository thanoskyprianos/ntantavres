import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Stack, Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Autocomplete, Rating } from '@mui/material';
import { green, red } from '@mui/material/colors';

const activeCollabs = [
  { name: 'Maria Papadopoulou', duration: '3 μήνες', typeOfDuty: 'Πλήρης' },
];

const renewalDurations = [
  { title: '1 μήνας' },
  { title: '2 μήνες' },
  { title: '3 μήνες' },
  { title: '4 μήνες' },
  { title: '5 μήνες' },
  { title: '6 μήνες' },
  { title: '7 μήνες' },
  { title: '8 μήνες' },
  { title: '9 μήνες' },
  { title: '10 μήνες' },
  { title: '11 μήνες' },
  { title: '12 μήνες' },
];

export const EditActiveCollab = () => {
  const [open, setOpen] = useState(false);
  const [selectedCollab, setSelectedCollab] = useState(null);
  const [renewalDuration, setRenewalDuration] = useState(null);
  const [rating, setRating] = useState<number | null>(null);
  const [ratingDescription, setRatingDescription] = useState('');
  const [isRenewal, setIsRenewal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ratingError, setRatingError] = useState(false);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);
  const [renewalError, setRenewalError] = useState(false);

  const handleOpenDialog = (collab, isRenewal) => {
    setSelectedCollab(collab);
    setIsRenewal(isRenewal);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedCollab(null);
    setRenewalDuration(null);
    setRating(null);
    setRatingDescription('');
    setRatingError(false);
    setRatingSubmitted(false);
    setRenewalError(false);
  };

  const handleConfirm = () => {
    if (isRenewal && !renewalDuration) {
      setRenewalError(true);
      return;
    }

    if (!ratingSubmitted && !isRenewal) {
      setRatingError(true);
      return;
    }

    setSuccess(true);
    handleCloseDialog();
  };

  const handleSubmitRating = () => {
    if (rating === null) {
      setRatingError(true);
    } else {
      setRatingError(false);
      setRatingSubmitted(true);
    }
  };

  return (
    <Box sx={{ padding: 2, display: 'flex', justifyContent: 'center' }}>
      <Stack spacing={2} sx={{ width: '100%', maxWidth: 400 }}>
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
                <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => handleOpenDialog(collab, true)}>
                  ΑΝΑΝΕΩΣΗ ΣΥΝΕΡΓΑΣΙΑΣ
                </Button>
                <Button variant="outlined" color="error" sx={{ mt: 2 }} onClick={() => handleOpenDialog(collab, false)}>
                  ΑΚΥΡΩΣΗ ΣΥΝΕΡΓΑΣΙΑΣ
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}

      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>{isRenewal ? 'Ανανέωση Συνεργασίας' : 'Ακύρωση Συνεργασίας'}</DialogTitle>
        <DialogContent>
          {isRenewal ? (
            <>
              <DialogContentText>
                Επιλέξτε για πόσο καιρό θέλετε να ανανεώσετε τη συνεργασία.
              </DialogContentText>
              <Autocomplete
                id="renewal-duration"
                options={renewalDurations}
                getOptionLabel={(option) => option.title}
                value={renewalDuration}
                onChange={(event, newValue) => setRenewalDuration(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Διάρκεια Ανανέωσης"
                    placeholder="Επιλογή διάρκειας"
                    fullWidth
                    sx={{ mt: 2 }}
                    error={renewalError}
                    helperText={renewalError ? 'Η επιλογή διάρκειας είναι υποχρεωτική' : ''}
                  />
                )}
              />
            </>
          ) : (
            <>
              <DialogContentText>
                Βαθμολογία επαγγελματία
              </DialogContentText>
              <Rating
                name="rating"
                value={rating}
                onChange={(event, newValue) => setRating(newValue)}
                sx={{ mt: 2 }}
              />
              {ratingError && (
                <Typography sx={{ color: red[500], mt: 1 }}>
                  Η βαθμολογία είναι υποχρεωτική
                </Typography>
              )}
              <TextField
                label="Περιγραφή Αξιολόγησης"
                placeholder="Περιγραφή Αξιολόγησης"
                fullWidth
                multiline
                rows={4}
                value={ratingDescription}
                onChange={(e) => setRatingDescription(e.target.value)}
                sx={{ mt: 2 }}
              />
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={handleSubmitRating}
              >
                Υποβολή Αξιολόγησης
              </Button>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>
            ΠΙΣΩ
          </Button>
          {isRenewal ? (
            <Button onClick={handleConfirm} sx={{ color: green[500] }} autoFocus>
              ΑΝΑΝΕΩΣΗ ΣΥΝΕΡΓΑΣΙΑΣ
            </Button>
          ) : (
            <Button onClick={handleConfirm} sx={{ color: red[500] }} autoFocus disabled={!ratingSubmitted}>
              ΑΚΥΡΩΣΗ ΣΥΝΕΡΓΑΣΙΑΣ
            </Button>
          )}
        </DialogActions>
      </Dialog>
      {success && (
        <Box sx={{ mt: 4 }}>
          <Typography sx={{ color: green[500], textAlign: 'center', mb: 2 }}>
            Η ενέργεια ολοκληρώθηκε με επιτυχία
          </Typography>
        </Box>
        )}
      </Stack>
    </Box>
  );
};

export default EditActiveCollab;