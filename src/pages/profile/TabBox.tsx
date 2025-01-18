import React, { ReactNode } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const styles = {
  meetings: {
    position: 'relative',
    borderRadius: '15px',
    padding: '20px',
    color: 'text.main',
    background: 'linear-gradient(135deg,rgb(0, 151, 88),rgb(81, 255, 177))',
  },
  collaborations: {
    position: 'relative',
    background: 'linear-gradient(135deg, #4CAF50,rgb(175, 244, 97))',
    borderRadius: '15px',
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

type Variant = 'meetings' | 'collaborations' | 'payment';

interface TabBoxProps {
  variant: Variant;
  children?: ReactNode;
}

export const TabBox: React.FC<TabBoxProps> = ({ variant, children }) => {
  const { t } = useTranslation();

  return (
    <Stack spacing={1}>
      <Box sx={styles[variant]}>
        <Typography variant="h6">{`${t(`tabBox.${variant}`)}`}</Typography>
      </Box>
      {children}
    </Stack>
  );
};
