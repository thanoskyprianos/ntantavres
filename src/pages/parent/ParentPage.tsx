import { Box, Typography } from '@mui/material';
import { AdSearch } from '@components/AdSearch.tsx';
import { useBabysitter } from '@/hooks/useBabysitter.hook.ts';

export const ParentPage = () => {
  const { queryAds, isLoading } = useBabysitter();

  return (
    <Box
      sx={{
        padding: 2,
        width: '300px',
        marginLeft: '10px',
        marginRight: 'auto',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Εύρεση Νταντάς
      </Typography>
      <AdSearch queryAds={queryAds} isLoading={isLoading} showServicesFilter />
    </Box>
  );
};
