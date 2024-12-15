import React, { useState, useRef, useEffect } from 'react';
import { Box, TextField, Typography, Button, Stack, CircularProgress,
  Card, CardContent
} from '@mui/material';
import { green, red } from '@mui/material/colors';
import CheckIcon from '@mui/icons-material/Check';
import UploadFile from '@mui/icons-material/UploadFile';
import { EventAvailable, Upgrade, CalendarMonth } from '@mui/icons-material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';


export const CardDetailPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [timeError, setTimeError] = useState(false);
  const [modeError, setModeError] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [selectedMode, setSelectedMode] = useState<string | null>(null);

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

    if (!selectedDate) {
      setDateError(true);
      hasError = true;
    } else {
      setDateError(false);
    }

    if (!selectedTime) {
      setTimeError(true);
      hasError = true;
    } else {
      const selectedHour = selectedTime.getHours();
      if (selectedHour < 9 || selectedHour > 21) {
        setTimeError(true);
        hasError = true;
      } else {
        setTimeError(false);
      }
    }

    if (!selectedMode) {
      setModeError(true);
      hasError = true;
    } else {
      setModeError(false);
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

  const handleModeClick = (mode: string) => {
    setSelectedMode(mode);
  };

  return (
    <Box sx={{ padding: 2, maxWidth: 400, margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom>
        ΠΡΟΓΡΑΜΜΑΤΙΣΜΟΣ ΡΑΝΤΕΒΟΥ
      </Typography>
      <Stack spacing={2}>

        <DatePicker
          label="Επιλογή Ημερομηνίας"
          value={selectedDate}
          onChange={(newValue) => setSelectedDate(newValue)}
          slots={{
            textField: TextField,
          }}
          slotProps={{
            textField: {
              fullWidth: true,
              sx: { mt: 2 , fontSize: '13px'},
              error: dateError,
              helperText: dateError ? 'Η επιλογή ημέρας είναι υποχρεωτική' : '',
            }
          }}
        />
        <TimePicker
          label="Επιλογή Ώρας (9πμ-9μμ)"
          value={selectedTime}
          onChange={(newValue) => setSelectedTime(newValue)}
          slots={{
            textField: TextField,
          }}
          slotProps={{
            textField: {
              fullWidth: true,
              sx: { mt: 2 , fontSize: '13px'},
              error: timeError,
              helperText: timeError ? 'Η επιλογή ώρας είναι υποχρεωτική και πρέπει να είναι μεταξύ 9πμ με 9μμ' : '',
            }
          }}
        />

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 4 }}>
        <Button
          variant="contained"
          sx={{
            background: selectedMode === 'in-person' ? 'linear-gradient(to right, #5361ff, #11508e)' : 'primary.main',
            color: selectedMode === 'in-person' ? '#fff' : '#000',
            '&:hover': {
              background: selectedMode === 'in-person' ? 'linear-gradient(to right, #5361ff, #11508e)' : 'primary.dark',
            },
            mr: 2,
            borderColor: modeError ? red[500] : 'transparent',
            borderWidth: modeError ? 2 : 0,
            borderStyle: modeError ? 'solid' : 'none',
          }}
          onClick={() => handleModeClick('in-person')}
          startIcon={selectedMode === 'in-person' ? <CheckIcon /> : null}
        >
          ΔΙΑ ΖΩΣΗΣ
        </Button>
        <Button
          variant="contained"
          sx={{
            background: selectedMode === 'online' ? 'linear-gradient(to right, #5361ff, #11508e)' : 'primary.main',
            color: selectedMode === 'online' ? '#fff' : '#000',
            '&:hover': {
              background: selectedMode === 'online' ? 'linear-gradient(to right, #5361ff, #11508e)' : 'primary.dark',
            },
            borderColor: modeError ? red[500] : 'transparent',
            borderWidth: modeError ? 2 : 0,
            borderStyle: modeError ? 'solid' : 'none',
          }}
          onClick={() => handleModeClick('online')}
          startIcon={selectedMode === 'online' ? <CheckIcon /> : null}
        >
          ΔΙΑΔΙΚΤΥΑΚΑ
        </Button>
      </Box>
      {modeError && (
        <Typography sx={{ color: red[500], textAlign: 'center', mt: 1, fontSize: '13px' }}>
          Η επιλογή τρόπου διεξαγωγής είναι υποχρεωτικός
        </Typography>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
          <Button
            variant="contained"
            sx={buttonSx}
            disabled={loading}
            onClick={handleButtonClick}
            startIcon={success ? <EventAvailable /> : <CalendarMonth />}
          >
            ΠΡΟΓΡΑΜΜΑΤΙΣΜΟΣ ΡΑΝΤΕΒΟΥ
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
        <Box sx={{ mt: 4 }}>
          <Typography sx={{ color: green[500], textAlign: 'center', mb: 2 }}>
            Το ραντεβού προγραμματίστηκε με επιτυχία
          </Typography>
          <Card variant="outlined" sx={{ borderColor: green[500], borderWidth: 2, maxWidth: 400 }}>
              <CardContent>
                <Typography variant="h6" component="div">
                  Στοιχεία Ραντεβού
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Όνομα:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Ημερομηνία: {selectedDate ? selectedDate.toLocaleDateString() : ' '}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Ώρα: {selectedTime ? selectedTime.toLocaleTimeString() : ' '}
                </Typography>
              </CardContent>
            </Card>
        </Box>
        )}
      </Stack>
    </Box>
  );
};