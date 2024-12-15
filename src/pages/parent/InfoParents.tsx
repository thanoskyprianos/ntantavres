import React, { useState, useRef, useEffect } from 'react';
import { Box, TextField, Typography, Button, Stack, CircularProgress } from '@mui/material';
import { green } from '@mui/material/colors';
import CheckIcon from '@mui/icons-material/Check';
import UploadFile from '@mui/icons-material/UploadFile';
import { Upgrade } from '@mui/icons-material';

export const InfoParents = () => {
  const [address, setAddress] = useState('Mylos Club');
  const [phone, setPhone] = useState('6946789226');
  const [email, setEmail] = useState('magicthanos@gmail.com');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

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

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

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
        ΠΛΗΡΟΦΟΡΙΕΣ
      </Typography>
      <Stack spacing={2}>
        <Typography variant="h6">Διεύθυνση κατοικίας:</Typography>
        <TextField
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          disabled={!isEditing}
          fullWidth
        />
        <Typography variant="h6">Τηλέφωνο Επικοινωνίας:</Typography>
        <TextField
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          disabled={!isEditing}
          fullWidth
        />
        <Typography variant="h6">Ηλεκτρονική Διεύθυνση:</Typography>
        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={!isEditing}
          fullWidth
        />
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
          <Button
            variant="contained"
            sx={buttonSx}
            disabled={loading}
            onClick={handleButtonClick}
            startIcon={success ? <CheckIcon /> : <Upgrade />}
          >
            Ενημέρωση
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
            Οι πληροφορίες ενημερώθηκαν με επιτυχία
          </Typography>
        )}
      </Stack>
    </Box>
  );
};

export default InfoParents;