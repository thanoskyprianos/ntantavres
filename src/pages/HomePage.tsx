import { Button, Rating, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { UserCard } from '../components/UserCard.tsx';
import { useDeviceDetect } from '../hooks/useDeviceDetect.hook.ts';

export const HomePage = () => {
  const { device } = useDeviceDetect();

  return (
    <Stack
      direction="row"
      sx={{
        justifyContent: device === 'mobile' ? 'center' : 'space-between',
        flexWrap: 'wrap',
        padding: '25px',
      }}
    >
      <Stack spacing={2}>
        <Typography variant="h5" gutterBottom>
          Είμαι..
        </Typography>
        <Button component={Link} to="/parent" className="button"
          sx={{
            width: '350px',
            fontSize: '20px',
            border: '2px solid',
          }}
        >
          Γονεας/Κηδεμονας
        </Button>
        <Button component={Link} to="/babysitter" className="button"
          sx={{ 
            width: "350px", 
            fontSize: "20px",
            border: "2px solid",
          }}
        >
        Επαγγελματιας/Νταντα
        </Button>
        <Button
          component={Link}
          to="/parent/profile"
        >GONIOS PROF</Button>
                <Button
          component={Link}
          to="/parent/sitterProfile"
        >NTANTA PROF</Button>
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
              Διάρκεια: Looking for a babysitter <br />
              Παιδιά: 5 children
            </Typography>
          </UserCard>
        </Stack>
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
        </Stack>
      </Stack>
    </Stack>
  );
};