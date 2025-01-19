import React, { useState } from 'react';
import { Box, Button, Stack, Typography, CircularProgress, Grid2, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useParent } from '@/hooks/useParent.hook.ts';
import { useBabysitter } from '@/hooks/useBabysitter.hook.ts';
import { UserCard } from '@components/UserCard.tsx';

const SearchHome: React.FC = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const { queryAds: queryParentAds, isLoading: isParentLoading } = useParent();
  const { queryAds: queryBabysitterAds, isLoading: isBabysitterLoading } = useBabysitter();
  const [type, setType] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [ads, setAds] = useState<any[]>([]);

  const handleSearch = async () => {
    let adsList = [];
    if (role === 'PARENT') {
      adsList = await queryParentAds([{ field: 'type', value: type }]);
    } else if (role === 'BABYSITTER') {
      adsList = await queryBabysitterAds([{ field: 'type', value: type }]);
    }
    setAds(adsList);
  };

  const renderAds = () => {
    if (role === 'BABYSITTER') {
      return (
        <Grid2 container spacing={3} justifyContent="center">
          {ads.map(ad => (
            <Grid2 item xs={12} key={ad.id}>
              <Box
                onClick={() => handleAdClick(ad.id)}
                sx={{
                  width: '800px',
                  backgroundColor: isDarkMode ? 'rgba(58, 58, 58, 0.95)' : 'white',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  borderRadius: '8px',
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                  }
                }}
              >
                <UserCard
                  name={ad.name}
                  description={ad.description}
                  photo={ad.photoUrl}
                  showButton={true}
                >
                  <Typography variant="body2">
                    Type: {ad.type} <br />
                    Duration: {ad.duration} months <br />
                  </Typography>
                </UserCard>
              </Box>
            </Grid2>
          ))}
        </Grid2>
      );
    } else {
      return (
        <Grid2 container spacing={3} justifyContent="center">
          {ads.map(ad => (
            <Grid2 item xs={12} sm={6} md={4} key={ad.id}>
              <Box
                onClick={() => handleAdClick(ad.id)}
                sx={{
                  height: '100%',
                  backgroundColor: isDarkMode ? 'rgba(58, 58, 58, 0.95)' : 'white',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  borderRadius: '8px',
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                  }
                }}
              >
                <UserCard
                  name={ad.userName}
                  description={ad.description}
                  photo={ad.userAvatar}
                  showButton={false}
                >
                  <Typography variant="body2">
                    Type: {ad.type} <br />
                    Duration: {ad.duration} months <br />
                    Children: {ad.children.map((child: any) => `Age: ${child.age}`).join(', ')}
                  </Typography>
                </UserCard>
              </Box>
            </Grid2>
          ))}
        </Grid2>
      );
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        padding: '20px',
        width: '100%',
      }}
    >
      <Stack spacing={1} sx={{ width: '100%', maxWidth: '600px' }}>
        <Stack direction="row" spacing={0.2} justifyContent="center">
          <Button
            variant={type === 'FULL_TIME' ? 'contained' : 'outlined'}
            onClick={() => setType('FULL_TIME')}
            sx={{
              width: '151px',
              color: type === 'FULL_TIME' ? 'white' : 'black',
              background: type === 'FULL_TIME' 
                ? 'linear-gradient(45deg, #00b09b, #96c93d)'
                : 'none',
              '&:hover': {
                boxShadow: type === 'FULL_TIME' ? '0 5px 8px 2px rgba(0,176,155,0.3)' : 'none',
              }
            }}
          >
            ΠΛΗΡΗΣ ΑΠΑΣΧΟΛΗΣΗ
          </Button>
          <Button
            variant={type === 'PART_TIME' ? 'contained' : 'outlined'}
            onClick={() => setType('PART_TIME')}
            sx={{
              width: '151px',
              color: type === 'PART_TIME' ? 'white' : 'black',
              background: type === 'PART_TIME' 
                ? 'linear-gradient(45deg, #FF8B42, #F54E5E)'
                : 'none',
              '&:hover': {
                boxShadow: type === 'PART_TIME' ? '0 5px 8px 2px rgba(245,78,94,0.3)' : 'none',
              }
            }}
          >
            ΜΕΡΙΚΗ ΑΠΑΣΧΟΛΗΣΗ
          </Button>
        </Stack>
        <Stack direction="row" spacing={0.2} justifyContent="center">
          <Button
            variant={role === 'PARENT' ? 'contained' : 'outlined'}
            onClick={() => setRole('PARENT')}
            sx={{
              width: '151px',
              color: role === 'PARENT' ? 'white' : 'black',
              background: role === 'PARENT' 
                ? 'linear-gradient(45deg, #5361ff, #3f51b5)'
                : 'none',
              '&:hover': {
                boxShadow: role === 'PARENT' ? '0 5px 8px 2px rgba(83, 97, 255, 0.3)' : 'none',
              }
            }}
          >
            ΓΟΝΕΑΣ
          </Button>
          <Button
            variant={role === 'BABYSITTER' ? 'contained' : 'outlined'}
            onClick={() => setRole('BABYSITTER')}
            sx={{
              width: '151px',
              color: role === 'BABYSITTER' ? 'white' : 'black',
              background: role === 'BABYSITTER' 
                ? 'linear-gradient(45deg,rgb(66, 148, 255),rgb(3, 106, 150))'
                : 'none',
              '&:hover': {
                boxShadow: role === 'BABYSITTER' ? '0 5px 8px 2px rgba(78, 159, 245, 0.3)' : 'none',
              }
            }}
          >
            ΝΤΑΝΤΑ
          </Button>
        </Stack>
        <Divider></Divider>
        <Button
          onClick={handleSearch}
          sx={{
            height: '45px',
            minWidth: '230px',
            borderRadius: '5px',
            fontWeight: 600,
            color: 'white',
            background: 'linear-gradient(to right,rgb(65, 81, 255),rgb(78, 166, 255))',
            transition: 'all 0.3s ease',
            textTransform: 'none',
            fontSize: '0.95rem',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 5px 15px rgba(83, 97, 255, 0.4)',
            }
          }}
        >
          ΑΝΑΖΗΤΗΣΗ
        </Button>
      </Stack>

      {isParentLoading || isBabysitterLoading ? (
        <CircularProgress sx={{ marginTop: '20px' }} />
      ) : (
        renderAds()
      )}
    </Box>
  );
};

export default SearchHome;