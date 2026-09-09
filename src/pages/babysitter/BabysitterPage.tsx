import { Box, Typography } from '@mui/material';
import { AdSearch } from '@components/AdSearch.tsx';
import { useParent } from '@/hooks/useParent.hook.ts';

export const BabysitterPage = () => {
  const { queryAds, isLoading } = useParent();

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
        Εύρεση αγγελίας
      </Typography>
      <AdSearch
        queryAds={queryAds}
        isLoading={isLoading}
        renderDetails={ad =>
          ad.children
            ? `Children: ${ad.children
                .map(child => `Age: ${child.age}`)
                .join(', ')}`
            : null
        }
      />
    </Box>
  );
};
