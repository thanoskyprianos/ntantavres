import {
  Box,
  Button,
  ButtonProps,
  Card,
  CardHeader,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { UserCard } from '../components/UserCard.tsx';
import { useDeviceDetect } from '../hooks/useDeviceDetect.hook.ts';
import { Dispatch, Ref, useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import './HomePage.css';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import HelpIcon from '@mui/icons-material/Help';
import { SearchBar } from './SearchBar';

import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { EventAvailable, ManageSearch, Task } from '@mui/icons-material';
import Carousel from 'react-material-ui-carousel';

export const HomePage = () => {
  const { ref, inView, entry } = useInView({
    triggerOnce: true, // Trigger the animation only once
    threshold: 0.3, // Trigger when 10% of the element is in view
  });
  const theme = useTheme();
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
  const [activeButton, setActiveButton] = useState<'buttons' | 'search' | null>(
    'buttons'
  );

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
    <Box sx={{ overflowX: 'hidden' }}>
      <div className="shape s1"></div>
      <div className="shape s2"></div>
      <div className="shape s3"></div>
      {/*<div className="shape s4"></div>*/}
      <Stack sx={{ placeItems: 'center', marginY: '50px' }}>
        <Stack spacing={5} sx={{ minHeight: '100vh' }}>
          <Stack sx={{ placeItems: 'center' }}>
            <Typography variant="h2" fontWeight="bold">
              NtantaVres
            </Typography>
            <Typography variant="h5" fontWeight="bold">
              Φροντίδα παιδιών έως και 2 ετών
            </Typography>
          </Stack>

          <TopButtonsSection
            activeButton={activeButton}
            toggleButtons={toggleButtons}
            toggleQuickSearch={toggleQuickSearch}
            showButtons={showButtons}
            showQuickSearch={showQuickSearch}
          />
        </Stack>

        <IconButton
          sx={{
            position: 'absolute',
            bottom: 10,
            animation: 'scrollDownAnim 1s infinite ease-in-out',
          }}
          onClick={() => entry?.target.scrollIntoView({ behavior: 'smooth' })}
        >
          <KeyboardDoubleArrowDownIcon
            sx={{
              width: '50px',
              height: '50px',
            }}
          />
        </IconButton>

        <Stack spacing={10}>
          <StatsSection refProp={ref} inView={inView} />
          <UserCardsSection />
          <StepsSection activeBox={activeBox} setActiveBox={setActiveBox} />
        </Stack>
      </Stack>
    </Box>
  );
};

interface GradientButtonProps extends ButtonProps {
  handleClick?: Dispatch<unknown>;
  isActive?: boolean;
}

const GradientButton = ({
  handleClick,
  isActive,
  children,
  ...rest
}: GradientButtonProps) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  return (
    <Button
      {...rest}
      onClick={handleClick}
      color="primary"
      sx={{
        height: '30px',
        // width: '249px',
        fontSize: '20px',
        color: isDarkMode ? '#fff' : '#000',
        background: isActive
          ? isDarkMode
            ? 'linear-gradient(to right, #5361ff, #11508e)'
            : 'linear-gradient(to right, #aeb5ff, #6496c8)'
          : isDarkMode
            ? '#3a3a3a'
            : '#e0e0e0',
        '&:hover': {
          background: isActive
            ? isDarkMode
              ? 'linear-gradient(to right, #5361ff, #11508e)'
              : 'linear-gradient(to right, #aeb5ff, #6496c8)'
            : undefined,
        },
      }}
    >
      {children}
    </Button>
  );
};

interface OutlinedButtonProps extends ButtonProps {
  to: string;
}

const OutlinedButton = ({ to, ...rest }: OutlinedButtonProps) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  return (
    <Button
      component={Link}
      to={to}
      variant="outlined"
      sx={{
        color: isDarkMode ? '#fff' : '#000',
        width: '350px',
        fontSize: '20px',
      }}
    >
      {rest.children}
    </Button>
  );
};

function TopButtonsSection({
  activeButton,
  toggleButtons,
  toggleQuickSearch,
  showButtons,
  showQuickSearch,
}: {
  activeButton: 'buttons' | 'search' | null;
  toggleButtons: () => void;
  toggleQuickSearch: () => void;
  showButtons: boolean;
  showQuickSearch: boolean;
}) {
  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={1} justifyContent="center">
        <GradientButton
          handleClick={toggleButtons}
          isActive={activeButton === 'buttons'}
        >
          Είμαι
        </GradientButton>
        <GradientButton
          handleClick={toggleQuickSearch}
          isActive={activeButton === 'search'}
        >
          ΓΡΗΓΟΡΗ ΑΝΑΖΗΤΗΣΗ
        </GradientButton>
      </Stack>

      <Box
        sx={{ display: 'flex', justifyContent: 'center', minHeight: '350px' }}
      >
        {showButtons && (
          <Stack spacing={1} alignItems="center">
            <OutlinedButton to="/parent">Γονεας/Κηδεμονας</OutlinedButton>
            <OutlinedButton to="/babysitter">
              Επαγγελματιας/Νταντα
            </OutlinedButton>
          </Stack>
        )}
        {showQuickSearch && (
          <Box sx={{ height: '350px' }}>
            <SearchBar showTypeOfUser />
          </Box>
        )}
      </Box>
    </Stack>
  );
}

function StatsSection({
  refProp,
  inView,
}: {
  refProp: Ref<Element>;
  inView: boolean;
}) {
  const { device } = useDeviceDetect();

  return (
    <Box
      ref={refProp}
      sx={{ scrollMarginTop: device !== 'mobile' ? '100px' : '150px' }}
    >
      {inView && (
        <Stack spacing={2} sx={{ alignItems: 'center' }}>
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ textAlign: 'center' }}
          >
            <CountUp start={0} end={1000} duration={5} />+ Επαγγελματίες <br />
            <CountUp start={0} end={17500} duration={5} />+ Γονείς <br />
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

function StepsSection({
  activeBox,
  setActiveBox,
}: {
  activeBox: string;
  setActiveBox: Dispatch<string>;
}) {
  return (
    <Stack spacing={4} sx={{ justifyContent: 'center', alignItems: 'center' }}>
      <Stack direction="row" spacing={1}>
        <GradientButton
          handleClick={() => setActiveBox('box1')}
          isActive={activeBox === 'box1'}
        >
          ΓΟΝΕΙΣ
        </GradientButton>
        <GradientButton
          handleClick={() => setActiveBox('box2')}
          isActive={activeBox === 'box2'}
        >
          ΕΠΑΓΓΕΛΜΑΤΙΕΣ
        </GradientButton>
      </Stack>

      {activeBox === 'box1' && (
        <Stack spacing={2} sx={{ placeContent: 'center', width: '350px' }}>
          <Typography variant="h5" fontWeight="bold" align="center">
            ΒΗΜΑΤΑ ΠΟΥ ΑΚΟΛΟΥΘΩ ΩΣ ΓΟΝΙΟΣ
          </Typography>
          <Card sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
            <CardHeader
              avatar={<AutoAwesomeIcon />}
              title={
                <Typography variant="h6" align="center">
                  1. Βρίσκω τον επαγγελματία που μου ταιριάζει
                </Typography>
              }
            />
          </Card>
          <Card sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
            <CardHeader
              avatar={<EventAvailable />}
              title={
                <Typography variant="h6" align="center">
                  2. Προγραμματίζω ραντεβού γνωριμίας με τον επαγγελματία
                </Typography>
              }
            />
          </Card>
          <Card sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
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
      )}
      {activeBox === 'box2' && (
        <Stack spacing={2} sx={{ placeContent: 'center', width: '350px' }}>
          <Typography variant="h5" fontWeight="bold" align="center">
            ΒΗΜΑΤΑ ΠΟΥ ΑΚΟΛΟΥΘΩ ΩΣ ΕΠΑΓΓΕΛΜΑΤΙΑΣ
          </Typography>
          <Card sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
            <CardHeader
              avatar={<ManageSearch />}
              title={
                <Typography variant="h6" align="center">
                  1. Βρίσκω την αγγελία που μου ταιριάζει
                </Typography>
              }
            />
          </Card>
          <Card sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
            <CardHeader
              avatar={<EventAvailable />}
              title={
                <Typography variant="h6" align="center">
                  2. Προγραμματίζω ραντεβού γνωριμίας με τον γονέα/κηδεμονα
                </Typography>
              }
            />
          </Card>
          <Card sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
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
      )}
    </Stack>
  );
}

function UserCardsSection() {
  const { device } = useDeviceDetect();

  return (
    <Stack
      spacing={2}
      sx={{
        placeItems: 'center',
        width: device !== 'mobile' ? '900px' : '450px',
      }}
    >
      <Typography variant="h5" fontWeight="bold">
        Αγγελίες & Επαγγελματίες
      </Typography>
      <Stack
        direction={device !== 'mobile' ? 'row' : 'column'}
        sx={{ width: 'inherit' }}
      >
        <Stack sx={{ width: '100%', placeItems: 'center' }} spacing={0}>
          <Carousel
            sx={{ width: '85%' }}
            navButtonsAlwaysInvisible={device !== 'desktop'}
            animation="slide"
            autoPlay={false}
            indicatorContainerProps={{ style: { marginTop: '0px' } }}
          >
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
          </Carousel>
          <Button
            startIcon={<DoubleArrowIcon />}
            component={Link}
            to="/parent"
            sx={{
              color: 'secondary.contrastText',
              height: '20px',
            }}
          >
            ΠΕΡΙΣΣΟΤΕΡΕΣ ΑΓΓΕΛΙΕΣ ΓΟΝΕΩΝ
          </Button>
        </Stack>
        <Stack sx={{ width: '100%', placeItems: 'center' }} spacing={0}>
          <Carousel
            sx={{ width: '85%' }}
            navButtonsAlwaysInvisible={device !== 'desktop'}
            animation="slide"
            autoPlay={false}
            indicatorContainerProps={{ style: { marginTop: '0px' } }}
          >
            <UserCard
              name="Maria"
              description="Experienced babysitter"
              photo="maria1.jpg"
              // rating={<Rating value={3} readOnly size="small" />}
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
              // rating={<Rating value={5} readOnly size="small" />}
            >
              <Typography variant="body2">
                Τοποθεσία: Kupseli <br />
                Υπηρεσίες: Polles <br />
                Εμπειρία: Xronia stin douleia
              </Typography>
            </UserCard>
            <UserCard
              name="Ioanna"
              description="Excited for my new chapter"
              photo="2.jpg"
              // rating={<Rating value={5} readOnly size="small" />}
            >
              <Typography variant="body2">
                Τοποθεσία: Kupseli <br />
                Υπηρεσίες: Polles <br />
                Εμπειρία: Xronia stin douleia
              </Typography>
            </UserCard>
          </Carousel>
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
      </Stack>
    </Stack>
  );
}
