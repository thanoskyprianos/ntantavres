import React, { useEffect, useState } from 'react';
import { useParent } from '@/hooks/useParent.hook.ts';
import { CircularProgress, TextField, Button, Stack, Typography, Autocomplete, Box, Slider, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Search from '@mui/icons-material/Search';
import { UserCard } from '@components/UserCard.tsx';
import { Clear } from '@mui/icons-material';

const AdSearchComponent: React.FC = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const { queryAds, isLoading } = useParent();
  const [ads, setAds] = useState<any[]>([]);
  const [type, setType] = useState<string>('');
  const [duration, setDuration] = useState<number | null>(null);
  const [childrenCount, setChildrenCount] = useState<number | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<{ title: string }[]>([]);
  const [description, setDescription] = useState<string>('');

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

    console.log('Search Criteria:', criteria); // Log the criteria
  
    try {
      const adsList = await queryAds(criteria);
      setAds(adsList);
    } catch (error) {
      console.error('Error fetching ads:', error);
    }
  };

  const clearFilters = () => {
    setType('');
    setDuration(0);
    setChildrenCount(0);
    setDescription('');
  };

  return (
    <Stack spacing={2}>
    <Box 
      sx={{ 
        width: '1090px',
        padding: '20px 30px',
        backgroundColor: isDarkMode ? 'rgba(58, 58, 58, 0.95)' : 'rgba(255, 255, 255, 0.95)',
        borderRadius: '16px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >  

      <Stack 
        direction="row" 
        spacing={2} 
        alignItems="center"
        sx={{ 
          height: '60px',
        }}
      >

        <Button
          startIcon={< Clear />}
          onClick={clearFilters}
          sx={{
            height: '45px',
            minWidth: '120px',
            borderRadius: '10px',
            fontWeight: 500,
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
          orientation="vertical"
          flexItem
          sx={{
            margin: '0 16px',
            opacity: isDarkMode ? 0.2 : 0.15,
            borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
          }}
        />

        <Stack direction="row" spacing={1}>
          <Button
            onClick={() => setType('FULL_TIME')}
            sx={{
              minWidth: '120px',
              height: '45px',
              color: type === 'FULL_TIME' ? 'white' : 'black',
              background: type === 'FULL_TIME' 
                ? 'linear-gradient(45deg, #00b09b, #96c93d)'
                : isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
              transition: 'all 0.3s ease',
              borderRadius: '10px',
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
              color: type === 'PART_TIME' ? 'white' : 'black',
              background: type === 'PART_TIME' 
                ? 'linear-gradient(45deg, #FF8B42, #F54E5E)'
                : isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
              transition: 'all 0.3s ease',
              borderRadius: '10px',
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
          orientation="vertical"
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
          orientation="vertical"
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
          orientation="vertical"
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
            minWidth: '130px',
            borderRadius: '10px',
            fontWeight: 600,
            color: 'white',
            background: 'linear-gradient(45deg, #5361ff 20%, #3f51b5 90%)',
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
          {ads.map(ad => (
            <Box
            key={ad.id}
            sx={{
              width: '300px',
              flex: 'none',
              backgroundColor: 'white',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              borderRadius: '8px',
            }}
          >
            <UserCard
              name={ad.parentName}
              description={ad.description}
              photo={ad.photoUrl}
              showButton={false}
            >
              <Typography variant="body2">
                Type: {ad.type} <br />
                Duration: {ad.duration} months <br />
                Children: {ad.children.map((child: any) => `Age: ${child.age}`).join(', ')}
              </Typography>
            </UserCard>
          </Box>
          ))}
        </Box>
      )}
    </Stack>
  );
};

export default AdSearchComponent;
