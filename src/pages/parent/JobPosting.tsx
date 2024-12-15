import React, { useState, useRef, useEffect } from 'react';
import { Box, TextField, Typography, Autocomplete, Stack, Button, CircularProgress } from '@mui/material';
import { green } from '@mui/material/colors';
import CheckIcon from '@mui/icons-material/Check';
import UploadFile from '@mui/icons-material/UploadFile';

const employmentTypes = [
  { title: 'Πλήρης' },
  { title: 'Μερική' },
];

const durations = [
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

const ageOptions = [
  { title: '0-12 μηνών' },
  { title: '12-24 μηνών' },
  { title: '24-36 μηνών' },
];

export const JobPosting = () => {
  const [description, setDescription] = useState('');
  const [employmentType, setEmploymentType] = useState(null);
  const [duration, setDuration] = useState(null);
  const [age, setAge] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [employmentTypeError, setEmploymentTypeError] = useState(false);
  const [durationError, setDurationError] = useState(false);
  const [ageError, setAgeError] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(null);

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700],
      },
    }),
  };

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = () => {
    let hasError = false;

    if (!description) {
      setDescriptionError(true);
      hasError = true;
    } else {
      setDescriptionError(false);
    }

    if (!employmentType) {
      setEmploymentTypeError(true);
      hasError = true;
    } else {
      setEmploymentTypeError(false);
    }

    if (!duration) {
      setDurationError(true);
      hasError = true;
    } else {
      setDurationError(false);
    }

    if (!age) {
      setAgeError(true);
      hasError = true;
    } else {
      setAgeError(false);
    }

    if (!hasError) {
      if (!loading) {
        setSuccess(false);
        setLoading(true);
        timer.current = setTimeout(() => {
          setSuccess(true);
          setLoading(false);
        }, 2000);
      }
    }
  };

  return (
    <Box sx={{ padding: 2, maxWidth: 400, margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom>
        Δημιουργία Αγγελίας
      </Typography>
      <Stack spacing={2}>
        <TextField
          label="Εισαγωγή Περιγραφής"
          placeholder="Περιγραφή"
          multiline
          rows={4}
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          error={descriptionError}
          helperText={descriptionError ? 'Η συμπλήρωση της περιγραφή είναι υποχρεωτική' : ''}
        />
        <Autocomplete
          id="employment-type"
          options={employmentTypes}
          getOptionLabel={(option) => option.title}
          value={employmentType}
          onChange={(event, newValue) => setEmploymentType(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Τύπος απασχόλησης"
              placeholder="Επιλογή τύπου απασχόλησης"
              error={employmentTypeError}
              helperText={employmentTypeError ? 'Η συμπλήρωση του τύπου απασχόλησης είναι υποχρεωτικός' : ''}
            />
          )}
        />
        <Autocomplete
          id="duration"
          options={durations}
          getOptionLabel={(option) => option.title}
          value={duration}
          onChange={(event, newValue) => setDuration(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Διάρκεια"
              placeholder="Επιλογή διάρκειας"
              error={durationError}
              helperText={durationError ? 'Η συμπλήρωση της διάρκειας είναι υποχρεωτική' : ''}
            />
          )}
        />
        <Autocomplete
          id="age"
          options={ageOptions}
          getOptionLabel={(option) => option.title}
          value={age}
          onChange={(event, newValue) => setAge(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Ηλικία"
              placeholder="Επιλογή ηλικίας"
              error={ageError}
              helperText={ageError ? 'Η συμπλήρωση της ηλικία του παιδιού είναι υποχρεωτική' : ''}
            />
          )}
        />
        <Typography>* Η τοποθεσία σας καταχωρείται αυτόματα</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
          <Button
            variant="contained"
            sx={buttonSx}
            disabled={loading}
            onClick={handleButtonClick}
            startIcon={success ? <CheckIcon /> : <UploadFile />}
          >
            Υποβολή
          </Button>
          {loading && (
            <CircularProgress
              size={24}
              sx={{
                color: green[500],
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-12px',
                marginLeft: '-12px',
              }}
            />
          )}
        </Box>
        {success && (
          <Typography sx={{ color: green[500], textAlign: 'center', mt: 2 }}>
            Η αγγελία αναρτήθηκε με επιτυχία
          </Typography>
        )}
      </Stack>
    </Box>
  );
};

export default JobPosting;
