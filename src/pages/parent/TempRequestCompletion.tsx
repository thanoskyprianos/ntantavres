import React, { useState } from 'react';
import { Box, Button, Stack, Stepper, Step, StepLabel, Card, CardContent, Typography, Alert } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { green, yellow, red } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';
import { NoteAdd, AssignmentTurnedIn, CheckBox } from '@mui/icons-material';

const pendingRequests = [
    { name: 'Maria Papadopoulou', duration: '3 μήνες', typeOfDuty: 'Πλήρης' },
];

export const TempRequestCompletion = () => {
  const [activeStep, setActiveStep] = useState(1); // Initialize to 1 to show the first step as completed
  const [errorMessage, setErrorMessage] = useState('');

  const steps = [
    'Δημιουργια αιτησης',
    'Υπογραφή',
    'Τελική Υποβολή'
  ];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleStep = (step) => () => {
    if (step === 3 && activeStep < 2) {
      setErrorMessage('Πρέπει να υπογράψετε πρώτα το συμφωνητικό.');
    } else {
      setActiveStep(step);
      setErrorMessage('');
    }
  };

  const StepIcon = (props) => {
    const { active, completed } = props;

    if (completed) {
      return <CheckCircleIcon sx={{ color: green[500] }} />;
    }

    return <RadioButtonUncheckedIcon color={active ? "primary" : "disabled"} />;
  };

  const isCompleted = activeStep >= steps.length;

  return (
    <Box sx={{ width: '100%', padding: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 4 }}>
        {pendingRequests.map((request, index) => (
          <Card
            key={index}
            variant="outlined"
            sx={{
                borderWidth: 3,
                width: 320,
                alignItems: 'center',
                borderImage: isCompleted ? 'linear-gradient(to right, #00c853, #b2ff59) 1' : `2px solid ${yellow[700]}`,
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography
                  variant="h6"
                  component="div"
                  textAlign="center"
                  sx={{
                    background: isCompleted ? 'linear-gradient(to right, #5361ff, #11508e)' : 'none',
                    WebkitBackgroundClip: isCompleted ? 'text' : 'none',
                    WebkitTextFillColor: isCompleted ? 'transparent' : 'inherit',
                  }}
                >
                  {request.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  textAlign="center"
                  sx={{
                    background: isCompleted ? 'linear-gradient(to right, #5361ff, #11508e)' : 'none',
                    WebkitBackgroundClip: isCompleted ? 'text' : 'none',
                    WebkitTextFillColor: isCompleted ? 'transparent' : 'inherit',
                  }}
                >
                  Διάρκεια συμφωνίας: {request.duration}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  textAlign="center"
                  sx={{
                    background: isCompleted ? 'linear-gradient(to right, #5361ff, #11508e)' : 'none',
                    WebkitBackgroundClip: isCompleted ? 'text' : 'none',
                    WebkitTextFillColor: isCompleted ? 'transparent' : 'inherit',
                  }}
                >
                  Τύπος Απασχόλησης: {request.typeOfDuty}
                </Typography>
                {isCompleted && (
                  <Typography variant="h6" textAlign="center" 
                    sx={{
                        marginTop: 2,
                        background: 'linear-gradient(to right, #00c853, #b2ff59)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                    >
                    Η συμφωνία ολοκληρώθηκε με επιτυχία
                  </Typography>
                )}
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
      <Stack direction="row" spacing={2} justifyContent="center" sx={{ marginTop: 4 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleStep(2)}
          disabled={activeStep >= 2}
          sx={{
            borderColor: errorMessage ? red[500] : 'inherit',
            borderWidth: errorMessage ? 2 : 'inherit',
            borderStyle: errorMessage ? 'solid' : 'none',
          }}
        >
          ΥπογραφΗ ΣΥΜΦΩΝΗΤΙΚΟΥ
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleStep(3)}
          disabled={activeStep >= 3}
        >
          ΤελικΗ ΥποβολΗ
        </Button>
      </Stack>
      {errorMessage && (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
          <Alert severity="error">{errorMessage}</Alert>
        </Box>
      )}
      <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector isCompleted={isCompleted} />} sx={{ marginTop: 5 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

const ColorlibConnector = styled(StepConnector)(({ theme, isCompleted }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: isCompleted ? 'linear-gradient(to right, #00c853, #b2ff59)' : 'linear-gradient(to right, #5361ff, #11508e)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: isCompleted ? 'linear-gradient(to right, #00c853, #b2ff59)' : 'linear-gradient(to right, #5361ff, #11508e)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
    ...theme.applyStyles('dark', {
      backgroundColor: theme.palette.grey[800],
    }),
  },
}));

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean; isCompleted?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor: ownerState.completed ? 'linear-gradient(to right, #5361ff, #11508e)' : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage: 'linear-gradient(to right, #5361ff, #11508e)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.isCompleted && {
    backgroundImage: 'linear-gradient(to right, #00c853, #b2ff59)',
  }),
  ...theme.applyStyles('dark', {
    backgroundColor: ownerState.completed ? 'linear-gradient(to right, #5361ff, #11508e)' : theme.palette.grey[700],
  }),
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement<unknown> } = {
    1: <NoteAdd />,
    2: <AssignmentTurnedIn />,
    3: <CheckBox />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active, isCompleted: completed }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

export default TempRequestCompletion;