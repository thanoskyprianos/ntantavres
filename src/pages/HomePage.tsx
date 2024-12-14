import { Button, Rating, Stack, Typography, Box, Card, CardHeader } from '@mui/material';
import { Link } from 'react-router-dom';
import { UserCard } from '../components/UserCard.tsx';
import { useDeviceDetect } from '../hooks/useDeviceDetect.hook.ts';
import { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import './HomePage.css';
import { Footer } from './footer/Footer.tsx';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import HelpIcon from '@mui/icons-material/Help';

import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { EventAvailable, Task } from '@mui/icons-material';


export const HomePage = () => {
  const theme = useTheme();
  const { device } = useDeviceDetect();
  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger the animation only once
    threshold: 0.1, // Trigger when 10% of the element is in view
  });
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--background-gradient', 
      theme.palette.mode === 'dark' 
        ? 'var(--background-gradient-dark)' 
        : 'var(--background-gradient-light)'
    );
  }, [theme.palette.mode]);
  return (
    <div className="animated-background">
    <div className="shape"></div>
    <div className="shape-reversed"></div>
    <Stack
      direction="row"
      sx={{
        justifyContent: device === 'mobile' ? 'center' : 'space-between',
        flexWrap: 'wrap',
        padding: '25px',
      }}
    >
      <Stack spacing={1}>
        <Typography variant="h5" gutterBottom>
          Είμαι..
        </Typography>
        <Button
          component={Link}
          to="/parent"
          variant="contained"
          className="button"
          sx={{
            width: '350px',
            fontSize: '20px',
            border: '2px solid',
          }}
        >
          Γονεας/Κηδεμονας
        </Button>
        <Button
          component={Link}
          variant="contained"
          to="/babysitter"
          className="button"
          sx={{
            width: '350px',
            fontSize: '20px',
            border: '2px solid',
          }}
        >
          Επαγγελματιας/Νταντα
        </Button>
        <Button component={Link} to="/parent/profile">
          GONIOS PROF
        </Button>
        <Button component={Link} to="/babysitter/profile">
          NTANTA PROF
        </Button>
      </Stack>


      <Stack spacing={3}>
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
              height:'12px',
            }}
          >ΔΕΣ ΠΕΡΙΣΣΟΤΕΡΕΣ ΑΓΓΕΛΙΕΣ ΓΟΝΕΩΝ</Button>
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
              height:'12px',
            }}
          >ΔΕΣ ΠΕΡΙΣΣΟΤΕΡΟΥΣ ΕΠΑΓΓΕΛΜΑΤΙΕΣ</Button>
      </Stack>

    </Stack>

    <Box ref={ref} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
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
              <Button component={Link}
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
    
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 4 }}>
      <Stack direction="column" spacing={3} alignItems="center">
          <Typography variant="h5" fontWeight="bold">ΒΗΜΑΤΑ ΠΟΥ ΑΚΟΛΟΥΘΩ</Typography>
          <Card sx={{ backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255, 255, 255, 0.2)', padding: 1, width: '270px' }}>
            <CardHeader
              avatar={<AutoAwesomeIcon />}
              title={
                  <Typography variant="h6">
                      1. Βρίσκω τον επαγγελματία που μου ταιριάζει
                  </Typography>
              }
            />
          </Card>
          <Card sx={{ backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255, 255, 255, 0.2)', padding: 1, width: '270px' }}>  
            <CardHeader
                avatar={<EventAvailable />}
                title={
                    <Typography variant="h6">
                      2. Προγραμματίζω ραντεβού γνωριμίας
                    </Typography>
                }
              />
          </Card>
          <Card sx={{ backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255, 255, 255, 0.2)', padding: 1, width: '270px' }}>
          <CardHeader
                avatar={<Task />}
                title={
                    <Typography variant="h6" >
                      3. Δημιουργώ και Υποβάλω την αίτηση συνεργασίας
                    </Typography>
                }
              />
          </Card>
      </Stack>
    </Box>
    <Footer></Footer>
    </div>
  );
};
