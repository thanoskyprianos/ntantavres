import React from 'react';

interface PaymentPageProps {}
import { Button, useTheme, Typography, Autocomplete, TextField, Box, Stack, Slider, Tooltip, IconButton, FormControlLabel, Radio, RadioGroup, Divider, Checkbox, Card, CardContent } from '@mui/material';
import { green } from '@mui/material/colors';
import { Payment, Info as InfoIcon } from '@mui/icons-material';

const activeCollabs = [
    { name: 'Maria Papadopoulou', duration: '1 μήνας ολοκληρώθηκε', typeOfDuty: 'Πλήρης' },
];

export const PaymentPage: React.FC<PaymentPageProps> = ({}) => {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    return (
        <>
            <Typography variant="h4">
                Σελίδα Πληρωμής
            </Typography>
            {activeCollabs.map((collab, index) => (
          <Card key={index} variant="outlined" 
          sx={{
            maxWidth: 400,
            margin: 'auto',
            padding: 4,
            border: '5px solid',                
            borderImage: isDarkMode 
            ? 'linear-gradient(45deg, #5361ff 30%, #11508e 90%) 1'
            : 'linear-gradient(45deg, #aeb5ff 30%, #6496c8 90%) 1'
            , borderWidth: 2 }}
            >
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h6" component="div" textAlign="center">
                  {collab.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" textAlign="center">
                  Εύρος Πληρωμής: {collab.duration}
                </Typography>
                <Typography variant="body2" color="text.secondary" textAlign="center">
                  Τύπος Απασχόλησης: {collab.typeOfDuty}
                </Typography>
                <Button 
                startIcon={<Payment />}
                variant="contained" color="primary"           
                sx={{
                    width: '330px',
                    marginTop: '15px',
                    height: '44px',
                    borderRadius: '8px',
                    fontWeight: 600,
                    color: isDarkMode ? 'white' : 'black',
                    background: isDarkMode 
                      ? 'linear-gradient(45deg, #5361ff 30%, #11508e 90%)'
                      : 'linear-gradient(45deg, #aeb5ff 30%, #6496c8 90%)',
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateY(-1px)',
                      boxShadow: '0 5px 8px 2px rgba(83, 97, 255, .3)',
                    }
                  }}
                  >
                  ΠΛΗΡΩΜΗ ΕΠΑΓΓΕΛΜΑΤΙΑ ΜΕΣΩ VOUCHER
                  <Tooltip title="Επισκεφθείτε την σελίδα Voucher για περισσότερες πληροφορίες">
                  <IconButton>
                    <InfoIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                </Button>

              </Box>
            </CardContent>
          </Card>
        ))}
        </>
    );
}