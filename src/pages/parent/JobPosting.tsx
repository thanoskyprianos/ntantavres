import React from 'react';
import { Box, TextField, Typography, Autocomplete, Stack, Button, CircularProgress, Fab } from '@mui/material';
import { green } from '@mui/material/colors';
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';
import { UploadFile } from '@mui/icons-material';

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
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const timer = React.useRef<ReturnType<typeof setTimeout>>(null);
  
    const buttonSx = {
      ...(success && {
        bgcolor: green[500],
        '&:hover': {
          bgcolor: green[700],
        },
      }),
    };
  
    React.useEffect(() => {
      return () => {
        clearTimeout(timer.current);
      };
    }, []);
  
    const handleButtonClick = () => {
      if (!loading) {
        setSuccess(false);
        setLoading(true);
        timer.current = setTimeout(() => {
          setSuccess(true);
          setLoading(false);
        }, 2000);
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
        />
        <Autocomplete
          id="employment-type"
          options={employmentTypes}
          getOptionLabel={(option) => option.title}
          renderInput={(params) => (
            <TextField {...params} label="Τύπος απασχόλησης" placeholder="Επιλογή τύπου απασχόλησης" />
          )}
        />
        <Autocomplete
          id="duration"
          options={durations}
          getOptionLabel={(option) => option.title}
          renderInput={(params) => (
            <TextField {...params} label="Διάρκεια" placeholder="Επιλογή διάρκειας" />
          )}
        />
        <Autocomplete
          id="age"
          options={ageOptions}
          getOptionLabel={(option) => option.title}
          renderInput={(params) => (
            <TextField {...params} label="Ηλικία" placeholder="Επιλογή ηλικίας" />
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
