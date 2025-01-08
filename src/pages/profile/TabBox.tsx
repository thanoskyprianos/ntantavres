import React from 'react';
import { Box, Typography } from '@mui/material';

const styles = {
    meetings: {
      position: 'relative',
      borderRadius: '10px',
      padding: '20px',
      color: 'text.main',
      background: 'linear-gradient(135deg,rgb(0, 151, 88),rgb(81, 255, 177))',
    },
    collaborations: {
      position: 'relative',
      background: 'linear-gradient(135deg, #4CAF50,rgb(175, 244, 97))',
      borderRadius: '10px',
      padding: '20px',
      color: 'text.main',
    },
    applications: {
      position: 'relative',
      background: 'linear-gradient(135deg, #2196F3,rgb(81, 164, 202))',
      borderRadius: '10px',
      padding: '20px',
      color: 'text.main',
    },
    history: {
      position: 'relative',
      background: 'linear-gradient(135deg, #E91E63, #F06292)',
      borderRadius: '10px',
      padding: '20px',
      color: 'text.main',
    },
    payment: {
      position: 'relative',
      borderRadius: '15px',
      padding: '20px',
      color: 'text.main',
      background: 'linear-gradient(135deg, #FF9800, #FFC107)',
    },
};

type Variant = 'meetings' | 'collaborations' | 'applications' | 'history' | 'payment';

interface TabBoxProps {
  variant: Variant;
}

export const TabBox: React.FC<TabBoxProps> = ({ variant }) => {
  return (
    <Box sx={styles[variant]}>
      <Typography variant="h6">{`${variant.charAt(0).toUpperCase() + variant.slice(1)} Box`}</Typography>
    </Box>
  );
};
