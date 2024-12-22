import {
  Box,
  Button,
  Card,
  CardHeader,
  Rating,
  Stack,
  Typography,
  TextField,
  Autocomplete,
} from '@mui/material';
import { SxProps } from '@mui/material';
import { Link } from 'react-router-dom';
import { UserCard } from '../components/UserCard.tsx';
import { useDeviceDetect } from '../hooks/useDeviceDetect.hook.ts';
import { useEffect, useState } from 'react';
import { useTheme, keyframes } from '@mui/material/styles';
import './HomePage.css';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import HelpIcon from '@mui/icons-material/Help';
import { SearchBar } from './SearchBar';

import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { EventAvailable, Height, ManageSearch, Search, Task } from '@mui/icons-material';

const gradientShift = keyframes`
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 200% 50%;
  }
`;

export const HomePage = () => {
  const theme = useTheme();
  const { device } = useDeviceDetect();
  const isDarkMode = theme.palette.mode === 'dark';
  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger the animation only once
    threshold: 0.3, // Trigger when 10% of the element is in view
  });
  const [activeBox, setActiveBox] = useState('box1');
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty(
      '--background-gradient',
      theme.palette.mode === 'dark'
        ? 'var(--background-gradient-dark)'
        : 'var(--background-gradient-light)'
    );
  }, [theme.palette.mode]);

  const [showButtons, setShowButtons] = useState(true);
  const [showQuickSearch, setShowQuickSearch] = useState(false);
  const [activeButton, setActiveButton] = useState<'buttons' | 'search' | null>('buttons');

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty(
      '--background-gradient',
      theme.palette.mode === 'dark'
        ? 'var(--background-gradient-dark)'
        : 'var(--background-gradient-light)'
    );
  }, [theme.palette.mode]);

  const toggleButtons = () => {
    setShowButtons(true);
    setShowQuickSearch(false);
    setActiveButton('buttons');
  };

  const toggleQuickSearch = () => {
    setShowQuickSearch(true);
    setShowButtons(false);
    setActiveButton('search');
  };

  return (
    <>
    <div className="shape"></div>
    <div className="shape2"></div>
    <div className="shape-reversed"></div>
    <div className="shape-reversed2"></div>
      <Typography
        variant="h1"
        align="center"
        fontWeight="bold"
        sx={{
          backgroundImage: 'linear-gradient(135deg, #5361ff, #aeb5ff, #1976d2, #0b2d50)',
          backgroundSize: '200% 200%',
          backgroundBlendMode: 'overlay',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 0 4px rgba(0,0,0,0.3)',
          filter: 'blur(0.3px)',
          animation: `${gradientShift} 20s linear infinite`
        }}
      >
        Ntantavres
      </Typography>
      <Typography variant="h4" align="center" fontWeight="bold"
        sx={{
          backgroundImage: [
            'linear-gradient(135deg, #5361ff, #aeb5ff, #1976d2, #0b2d50)'
          ].join(', '),
          backgroundRepeat: 'repeat, no-repeat',
          backgroundPosition: 'center, 0% 50%',
          backgroundBlendMode: 'overlay', 
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 0 4px rgba(0,0,0,0.3)',
          filter: 'blur(0.3px)',
        }}
      >
        Φροντίδα παιδιών έως και 2 ετών
      </Typography>

      <Stack spacing={5}>
        <Stack
          direction="column"
          spacing={40}
          alignItems="center"
          sx={{ padding: '25px' }}
        >
          <TopButtonsSection
            isDarkMode={isDarkMode}
            activeButton={activeButton}
            toggleButtons={toggleButtons}
            toggleQuickSearch={toggleQuickSearch}
            showButtons={showButtons}
            showQuickSearch={showQuickSearch}
          />

          <UserCardsSection isDarkMode={isDarkMode} />
        </Stack>
      
        <StatsSection refProp={ref} inView={inView} />


      <StepsSection
        isDarkMode={isDarkMode}
        activeBox={activeBox}
        setActiveBox={setActiveBox}
      />

      </Stack>

        
  </>
  );
};

function TopButtonsSection({
  isDarkMode,
  activeButton,
  toggleButtons,
  toggleQuickSearch,
  showButtons,
  showQuickSearch
}: {
  isDarkMode: boolean;
  activeButton: 'buttons' | 'search' | null;
  toggleButtons: () => void;
  toggleQuickSearch: () => void;
  showButtons: boolean;
  showQuickSearch: boolean;
}) {
  return (
    <Stack spacing={4}>
      <Stack direction="row" spacing={1} justifyContent="center">
        <Button
          onClick={toggleButtons}
          variant="contained"
          color="primary"
          sx={{ 
            height: '30px', 
            width: '249px', 
            fontSize: '20px',
            color: isDarkMode ? '#fff' : '#000',
            background: activeButton === 'buttons' 
              ? (isDarkMode
                ? 'linear-gradient(to right, #5361ff, #11508e)'
                : 'linear-gradient(to right, #aeb5ff, #6496c8)')
              : (isDarkMode ? '#3a3a3a' : '#e0e0e0'),
            '&:hover': {
              background: activeButton === 'buttons'
                ? (isDarkMode
                  ? 'linear-gradient(to right, #5361ff, #11508e)'
                  : 'linear-gradient(to right, #aeb5ff, #6496c8)')
                : undefined
            }
          }}
        >
          Ειμαι
        </Button>
        <Button 
          onClick={toggleQuickSearch} 
          variant="contained" 
          color="secondary"
          sx={{ 
            height: '30px', 
            width: '249px', 
            fontSize: '20px',
            color: isDarkMode ? '#fff' : '#000',
            background: activeButton === 'search'
              ? (isDarkMode
                ? 'linear-gradient(to right, #5361ff, #11508e)'
                : 'linear-gradient(to right, #aeb5ff, #6496c8)')
              : (isDarkMode ? '#3a3a3a' : '#e0e0e0'),
            '&:hover': {
              background: activeButton === 'search'
                ? (isDarkMode
                  ? 'linear-gradient(to right, #5361ff, #11508e)'
                  : 'linear-gradient(to right, #aeb5ff, #6496c8)')
                : undefined
            }
          }}
        >
          ΓΡΗΓΟΡΗ ΑΝΑΖΗΤΗΣΗ
        </Button>
      </Stack>

      <Box sx={{ display: 'flex', justifyContent: 'center', minHeight: '300px' }}>
        {showButtons && (
          <Stack spacing={1} alignItems="center">
            <Button
              component={Link}
              to="/parent"
              variant="outlined"
              sx={{
                color: isDarkMode ? '#fff' : '#000',
                width: '350px',
                fontSize: '20px',
                '&:hover': {
                  background: isDarkMode
                    ? 'linear-gradient(to right, #5361ff, #11508e)'
                    : 'linear-gradient(to right, #aeb5ff, #6496c8)',
                }
              }}
            >
              Γονεας/Κηδεμονας
            </Button>
            <Button
              component={Link}
              variant="outlined"
              to="/babysitter"
              sx={{
                color: isDarkMode ? '#fff' : '#000',
                width: '350px',
                fontSize: '20px',
                '&:hover': {
                  background: isDarkMode
                    ? 'linear-gradient(to right, #5361ff, #11508e)'
                    : 'linear-gradient(to right, #aeb5ff, #6496c8)',
                }
              }}
            >
              Επαγγελματιας/Νταντα
            </Button>
          </Stack>
        )}
        {showQuickSearch && (
          <Box sx={{ width: '350px', height: '300px' }}>
            <SearchBar showTypeOfUser />
          </Box>
        )}
      </Box>
    </Stack>
  );
}

function StatsSection({ refProp, inView }: any) {
  return (
    <Box
      ref={refProp}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      {inView && (
        <Stack direction="column" spacing={2} alignItems="center">
          <Typography variant="h3" fontWeight="bold">
            <CountUp start={0} end={1000} duration={5} />+ Επαγγελματίες
          </Typography>
          <Typography variant="h3" fontWeight="bold">
            <CountUp start={0} end={17500} duration={5} />+ Γονείς
          </Typography>
          <Typography variant="h3" fontWeight="bold">
            <CountUp start={0} end={36000} duration={5} />+ Χορηγημένα Voucher
          </Typography>
          <Button
            component={Link}
            to="/questions"
            startIcon={<HelpIcon />}
            sx={{
              color: 'secondary.contrastText',
            }}
          >
            ΣΥΧΝΕΣ ΕΡΩΤΗΣΕΙΣ
          </Button>
        </Stack>
      )}
    </Box>
  );
}

function StepsSection({ isDarkMode, activeBox, setActiveBox }: any) {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button
          variant="contained"
          onClick={() => setActiveBox('box1')}
          sx={{ 
            height: '30px', 
            width: '185px',  
            fontSize: '20px',
            marginRight: '5px',
            color: isDarkMode ? '#fff' : '#000',
            background: activeBox === 'box1'
              ? (isDarkMode
                ? 'linear-gradient(to right, #5361ff, #11508e)'
                : 'linear-gradient(to right, #aeb5ff, #6496c8)')
              : (isDarkMode ? '#3a3a3a' : '#e0e0e0'),
          }}
        >
          ΓΟΝΕΙΣ
        </Button>
        <Button
          variant="contained"
          onClick={() => setActiveBox('box2')}
          sx={{ 
            height: '30px', 
            width: '185px', 
            fontSize: '20px',
            color: isDarkMode ? '#fff' : '#000',
            background: activeBox === 'box2'
              ? (isDarkMode
                ? 'linear-gradient(to right, #5361ff, #11508e)'
                : 'linear-gradient(to right, #aeb5ff, #6496c8)')
              : (isDarkMode ? '#3a3a3a' : '#e0e0e0'),
            '&:hover': {
              background: activeBox === 'box2'
                ? (isDarkMode
                  ? 'linear-gradient(to right, #5361ff, #11508e)'
                  : 'linear-gradient(to right, #aeb5ff, #6496c8)')
                : undefined
            }
          }}
        >
          ΕΠΑΓΓΕΛΜΑΤΙΕΣ
        </Button>
      </Box>

      {activeBox === 'box1' && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mt: 4,
          }}
        >
          <Stack direction="column" spacing={3} alignItems="center">
            <Typography variant="h5" fontWeight="bold" align="center">
              ΒΗΜΑΤΑ ΠΟΥ ΑΚΟΛΟΥΘΩ ΩΣ ΓΟΝΙΟΣ
            </Typography>
            <Card
              sx={{
                backdropFilter: 'blur(10px)',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                padding: 1,
                width: '570px',
              }}
            >
              <CardHeader
                avatar={<AutoAwesomeIcon />}
                title={
                  <Typography variant="h6" align="center">
                    1. Βρίσκω τον επαγγελματία που μου ταιριάζει
                  </Typography>
                }
              />
            </Card>
            <Card
              sx={{
                backdropFilter: 'blur(10px)',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                padding: 1,
                width: '570px',
              }}
            >
              <CardHeader
                avatar={<EventAvailable />}
                title={
                  <Typography variant="h6" align="center">
                    2. Προγραμματίζω ραντεβού γνωριμίας με τον επαγγελματία
                  </Typography>
                }
              />
            </Card>
            <Card
              sx={{
                backdropFilter: 'blur(10px)',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                padding: 1,
                width: '570px',
              }}
            >
              <CardHeader
                avatar={<Task />}
                title={
                  <Typography variant="h6" align="center">
                    3. Δημιουργώ και Υποβάλω την αίτηση συνεργασίας
                  </Typography>
                }
              />
            </Card>
          </Stack>
        </Box>
      )}
      {activeBox === 'box2' && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mt: 4,
          }}
        >
          <Stack direction="column" spacing={3} alignItems="center">
            <Typography variant="h5" fontWeight="bold" align="center">
              ΒΗΜΑΤΑ ΠΟΥ ΑΚΟΛΟΥΘΩ ΩΣ ΕΠΑΓΓΕΛΜΑΤΙΑΣ
            </Typography>
            <Card
              sx={{
                backdropFilter: 'blur(10px)',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                padding: 1,
                width: '570px',
              }}
            >
              <CardHeader
                avatar={<ManageSearch />}
                title={
                  <Typography variant="h6" align="center">
                    1. Βρίσκω την αγγελία που μου ταιριάζει
                  </Typography>
                }
              />
            </Card>
            <Card
              sx={{
                backdropFilter: 'blur(10px)',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                padding: 1,
                width: '570px',
              }}
            >
              <CardHeader
                avatar={<EventAvailable />}
                title={
                  <Typography variant="h6" align="center">
                    2. Προγραμματίζω ραντεβού γνωριμίας με τον γονέα/κηδεμονα
                  </Typography>
                }
              />
            </Card>
            <Card
              sx={{
                backdropFilter: 'blur(10px)',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                padding: 1,
                width: '570px',
              }}
            >
              <CardHeader
                avatar={<Task />}
                title={
                  <Typography variant="h6">
                    3. Δημιουργώ και Υποβάλω την αίτηση συνεργασίας
                  </Typography>
                }
              />
            </Card>
          </Stack>
        </Box>
      )}
    </>
  );
}

function UserCardsSection({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        mt: 4
      }}
    >
      
    <Stack spacing={3}>
      <Typography variant="h4" align="center" fontWeight="bold">
        Αγγελίες & Επαγγελματίες
      </Typography>
      <Stack direction="row" spacing={2}>
        <UserCard
          name="Athanasios"
          description="Looking for a babysitter"
          photo="Young_Vito.webp"
        >
          <Typography variant="body2">
            Τοποθεσία: Petroupoli <br />
            Διάρκεια: 5 mines <br />
            Παιδιά: 5 children
          </Typography>
        </UserCard>
        <UserCard
          name="Anastasios"
          description="Psaxnw Ntanta stin perioxi mou"
          photo="1-draco-malfoy (1).jpg"
        >
          <Typography variant="body2">
            Τοποθεσία: Irakleio <br />
            Διάρκεια: 1 etos <br />
            Παιδιά: 1 children
          </Typography>
        </UserCard>
      </Stack>
      <Button
        startIcon={<DoubleArrowIcon />}
        component={Link}
        to="/parent"
        sx={{
          color: 'secondary.contrastText',
          height: '12px',
        }}
      >
        ΠΕΡΙΣΣΟΤΕΡΕΣ ΑΓΓΕΛΙΕΣ ΓΟΝΕΩΝ
      </Button>
      <Stack direction="row" spacing={2}>
        <UserCard
          name="Maria"
          description="Experienced babysitter"
          photo="maria1.jpg"
          rating={<Rating value={3} readOnly size="small" />}
        >
          <Typography variant="body2">
            Τοποθεσία: Athens <br />
            Υπηρεσίες: Alot <br />
            Εμπειρία: Experienced babysitter
          </Typography>
        </UserCard>
        <UserCard
          name="Ioanna"
          description="Excited for my new chapter"
          photo="2.jpg"
          rating={<Rating value={5} readOnly size="small" />}
        >
          <Typography variant="body2">
            Τοποθεσία: Kupseli <br />
            Υπηρεσίες: Polles <br />
            Εμπειρία: Xronia stin douleia
          </Typography>
        </UserCard>
      </Stack>
      <Button
        startIcon={<DoubleArrowIcon />}
        component={Link}
        to="/babysitter"
        sx={{
          color: 'secondary.contrastText',
          height: '12px',
        }}
      >
        ΠΕΡΙΣΣΟΤΕΡΟΙ ΕΠΑΓΓΕΛΜΑΤΙΕΣ
      </Button>
    </Stack>
    </Box>
  );
}