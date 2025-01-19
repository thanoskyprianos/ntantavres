import React, { useEffect, useState } from 'react';
import { useBabysitter } from '@/hooks/useBabysitter.hook.ts';
import { CircularProgress, TextField, Button, Stack, Typography, Autocomplete, Box, Slider, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Search from '@mui/icons-material/Search';
import { UserCard } from '@components/UserCard.tsx';
import { Clear } from '@mui/icons-material';
import { useUserDetails } from '@hooks/useUserDetails.hook.ts';
import { useNavigate } from 'react-router-dom';

const BabysitterSearchComponent: React.FC = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const { queryAds, isLoading } = useBabysitter();
  const [babysitters, setBabysitters] = useState<any[]>([]);
  const [type, setType] = useState<string>('');
  const [services, setServices] = useState<string[]>([]);
  const [duration, setDuration] = useState<number | null>(null);
  const [childrenCount, setChildrenCount] = useState<number | null>(null);
  const { getUserDetails, getUserAvatar } = useUserDetails();

  const navigate = useNavigate();

  const handleAdClick = (userId: string) => {
    navigate(`/profile/${userId}`);
  };

  const serviceOptions = [
    'Μαγείρεμα', 'Παιχνίδι', 'Μαθηματικά', 'Πιάνο', 'Γλώσσα',
    'Σιδέρωμα Ρούχων', 'Μελέτη βιβλίων', 'Συνοδεία σε ταξίδια',
    'Δημιουργική Απασχόληση', 'Δουλειές γύρω από το παιδί'
  ];

  const typeKeywords: { [key: string]: string } = {
    'πλήρης': 'FULL_TIME',
    'πληρης': 'FULL_TIME',
    'full': 'FULL_TIME',
    'full time': 'FULL_TIME',
    'μερική': 'PART_TIME',
    'μερικη': 'PART_TIME',
    'part': 'PART_TIME',
    'part time': 'PART_TIME'
  };

  const normalizeType = (input: string) => {
    const normalizedInput = input.trim().toLowerCase();
    return typeKeywords[normalizedInput] || input;
  };

  const handleSearch = async () => {
    const criteria = [];
    const normalizedType = normalizeType(type);
    if (normalizedType) criteria.push({ field: 'type', value: normalizedType });
    if (duration !== null && duration > 0) criteria.push({ field: 'duration', value: duration });
    if (childrenCount !== null && childrenCount > 0) criteria.push({ field: 'children', value: childrenCount });
    if (services.length > 0) criteria.push({ field: 'services', value: services });
  
    console.log('Search Criteria:', criteria);
  
    try {
      const babysitterList = await queryAds(criteria);
  
      const updatedBabysitters = await Promise.all(
        babysitterList.map(async (ad) => {
          try {
            const userDetails = await getUserDetails(ad.id); // Use ad.id directly
            const userAvatar = await getUserAvatar(ad.id);  // Use ad.id directly
            return {
              ...ad,
              name: `${userDetails.firstName} ${userDetails.lastName}`,
              photoUrl: userAvatar || '',
            };
          } catch (err) {
            console.error('Error fetching user details:', err);
            return { ...ad, name: 'Unknown', photoUrl: '' };
          }
        })
      );
  
      setBabysitters(updatedBabysitters);
    } catch (error) {
      console.error('Error fetching babysitters:', error);
    }
  };
  

  const clearFilters = () => {
    setType('');
    setDuration(0);
    setChildrenCount(0);
    setServices([]);
  };

  return (
    <Stack direction='row' spacing={2}>
      <Box 
        sx={{
          marginLeft: '300px',
          width: '450px',
          height: '500px',
          padding: '10px 10px',
          backgroundColor: isDarkMode ? 'rgba(58, 58, 58, 0.95)' : 'rgba(255, 255, 255, 0.95)',
          borderRadius: '5px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '4px solid transparent',

          borderImage: isDarkMode
            ? 'linear-gradient(to right, #727eff, #1a81e9) 1'
            : 'linear-gradient(to right, #c3c8ff, #86c3ff) 1',
        }}
      > 
      <Typography variant='h6' sx={{marginLeft: '40px', marginBottom: '10px', fontWeight: 'bold'}}>
        ΦΙΛΤΡΑ ΑΝΑΖΗΤΗΣΗΣ
      </Typography>

      <Divider
        flexItem
        sx={{
          margin: '0 16px',
          opacity: isDarkMode ? 0.2 : 0.15,
          borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
          marginBottom: '10px'
        }}
      />

        <Stack 
          direction="column" 
          spacing={2} 
          alignItems="center"
          sx={{ 
            height: '60px',
          }}
        >

          <Button
            startIcon={<Clear />}
            onClick={clearFilters}
            sx={{
              fontWeight: 'bold',
              height: '45px',
              minWidth: '120px',
              borderRadius: '5px',
              color: 'rgb(255, 88, 88)',
              background: 'rgba(255, 107, 107, 0.31)',
              transition: 'all 0.3s ease',
              textTransform: 'none',
              fontSize: '0.9rem',
              '&:hover': {
                background: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                transform: 'translateY(-2px)',
              }
            }}
          >
            ΚΑΘΑΡΙΣΜΟΣ
          </Button>

          <Divider
            flexItem
            sx={{
              margin: '0 16px',
              opacity: isDarkMode ? 0.2 : 0.15,
              borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
            }}
          />

          <Stack direction="row" spacing={0.2}>
            <Button
              onClick={() => setType('FULL_TIME')}
              sx={{
                minWidth: '120px',
                height: '45px',
                fontWeight: 'bold',
                borderRadius: '5px',
                color: type === 'FULL_TIME' ? 'white' : 'black',
                background: type === 'FULL_TIME' 
                  ? 'linear-gradient(45deg, #00b09b, #96c93d)'
                  : isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: type === 'FULL_TIME' ? '0 5px 15px rgba(0,176,155,0.4)' : 'none',
                }
              }}
            >
              ΠΛΗΡΗΣ
            </Button>
            <Button
              onClick={() => setType('PART_TIME')}
              sx={{
                minWidth: '120px',
                height: '45px',
                fontWeight: 'bold',
                borderRadius: '5px',
                color: type === 'PART_TIME' ? 'white' : 'black',
                background: type === 'PART_TIME' 
                  ? 'linear-gradient(45deg, #FF8B42, #F54E5E)'
                  : isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: type === 'PART_TIME' ? '0 5px 15px rgba(245,78,94,0.4)' : 'none',
                }
              }}
            >
              ΜΕΡΙΚΗ
            </Button>
          </Stack>

          <Divider
            flexItem
            sx={{
              margin: '0 16px',
              opacity: isDarkMode ? 0.2 : 0.15,
              borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
            }}
          />
      
          <Autocomplete
            multiple
            options={serviceOptions}
            getOptionLabel={(option) => option}
            value={services}
            onChange={(event, newValue) => setServices(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                placeholder="Επιλέξτε Υπηρεσίες"
              />
            )}
            sx={{
              minWidth: '230px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '5px',
              }
            }}
          />

          <Divider
            flexItem
            sx={{
              margin: '0 16px',
              opacity: isDarkMode ? 0.2 : 0.15,
              borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
            }}
          />

          <Stack direction="row" spacing={1} alignItems="center" sx={{ minWidth: '200px' }}>
            <Typography sx={{ fontSize: '0.9rem', fontWeight: 500, whiteSpace: 'nowrap' }}>
              ΔΙΑΡΚΕΙΑ
            </Typography>
            <Slider
              value={duration !== null ? duration : 0}
              onChange={(event, newValue) => {
                if (typeof newValue === 'number') {
                  setDuration(newValue);
                }
              }}
              step={1}
              min={0}
              max={12}
              valueLabelDisplay="auto"
              sx={{
                width: '120px',
                color: isDarkMode ? '#5361ff' : '#6496c8',
                '& .MuiSlider-thumb': {
                  width: 14,
                  height: 14,
                  transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                  '&:hover': {
                    boxShadow: '0 0 0 8px rgba(83, 97, 255, 0.16)',
                  }
                },
                '& .MuiSlider-rail': {
                  opacity: 0.3,
                }
              }}
            />
          </Stack>

          <Divider
            flexItem
            sx={{
              margin: '0 16px',
              opacity: isDarkMode ? 0.2 : 0.15,
              borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
            }}
          />

          <Stack direction="row" spacing={1} alignItems="center" sx={{ minWidth: '200px' }}>
            <Typography sx={{ fontSize: '0.9rem', fontWeight: 500, whiteSpace: 'nowrap' }}>
              #ΠΑΙΔΙΩΝ
            </Typography>
            <Slider
              value={childrenCount !== null ? childrenCount : 0}
              onChange={(event, newValue) => {
                if (typeof newValue === 'number') {
                  setChildrenCount(newValue);
                }
              }}
              step={1}
              min={0}
              max={24}
              valueLabelDisplay="auto"
              sx={{
                width: '120px',
                color: isDarkMode ? '#5361ff' : '#6496c8',
                '& .MuiSlider-thumb': {
                  width: 14,
                  height: 14,
                  transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                  '&:hover': {
                    boxShadow: '0 0 0 8px rgba(83, 97, 255, 0.16)',
                  }
                },
                '& .MuiSlider-rail': {
                  opacity: 0.3,
                }
              }}
            />
          </Stack>

          <Divider
            flexItem
            sx={{
              margin: '0 16px',
              opacity: isDarkMode ? 0.2 : 0.15,
              borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
            }}
          />

          <Button
            startIcon={<Search />}
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
      </Box>

      <Divider
        orientation='vertical'
        flexItem
        sx={{
          margin: '0 16px',
          opacity: isDarkMode ? 0.2 : 0.15,
          borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
        }}
      />

      {isLoading ? (
        <CircularProgress />
      ) : (
        <Box
          sx={{
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            justifyContent: 'start',
          }}
        >
          {babysitters.map(babysitter => (
            <Box
              key={babysitter.id}
              onClick={() => handleAdClick(babysitter.id)}
              sx={{
                  width: '800px',
                  flex: 'none',
                  backgroundColor: 'white',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  borderRadius: '8px',
              }}
            >
              <UserCard
                name={babysitter.name}
                description={babysitter.description}
                photo={babysitter.photoUrl}
                showButton={true}
              >
              <Typography variant="body2">
              Type: {babysitter.type} <br />
              Duration: {babysitter.duration} months <br />
              </Typography>
            </UserCard>
            </Box>
          ))}
        </Box>
      )}
    </Stack>
  );
};

export default BabysitterSearchComponent;
