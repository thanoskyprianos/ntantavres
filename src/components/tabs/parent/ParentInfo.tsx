import { useDeviceDetect } from '@hooks/useDeviceDetect.hook.ts';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from '@mui/material';
import { UserCard } from '@components/UserCard.tsx';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { AddCircleOutline } from '@mui/icons-material';
import { TFunction } from 'i18next';

interface ParentInfoProps {
  t: TFunction;
  address?: string;
  phoneNumber?: string;
  email?: string;
  number?: number;
  city?: string;
}

// TODO: CRUD
interface BabysitterAdProps {
  t: TFunction;
}

const BabysitterAd = ({ t }: BabysitterAdProps) => {
  return (
    <Card sx={{ borderRadius: '15px', width: '100%' }}>
      <CardHeader title={t('parent.babysitterAd.title')} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <UserCard
          name="Athanasios"
          description="Looking for a babysitter"
          photo="Young_Vito.webp"
          showButton={false}
        >
          <Typography variant="body2">
            Τοποθεσία: Petroupoli <br />
            Διάρκεια: 5 mines <br />
            Παιδιά: 5 children
          </Typography>
        </UserCard>
      </Box>
      <CardActions>
        <Button
          component={Link}
          to="/parent/createORedit"
          className="edit-button"
          startIcon={<EditIcon />}
          sx={{ color: 'secondary.contrastText' }}
        >
          {t('parent.babysitterAd.edit')}
        </Button>
        <Button
          className="edit-button"
          color="success"
          startIcon={<AddCircleOutline />}
          // onClick={handleClickOpen}
        >
          {t('parent.babysitterAd.create')}
        </Button>
      </CardActions>
    </Card>
  );
};

const Details = ({
  t,
  address,
  phoneNumber,
  email,
  number,
  city,
}: ParentInfoProps) => {
  return (
    <Card
      // variant="outlined"
      sx={{
        width: '100%',
        borderRadius: '15px',
      }}
    >
      <CardHeader title={t('parent.info.title')} />
      <CardContent>
        <Typography variant="h6" sx={{ color: 'text.main' }}>
          {t('parent.info.address')}
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          {number && address && city
            ? `${number} ${address} ${city}`
            : t('parent.info.notSet')}
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.main' }}>
          {t('parent.info.phoneNumber')}
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          {phoneNumber || t('parent.info.notSet')}
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.main' }}>
          {t('parent.info.email')}
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          {email}
        </Typography>
      </CardContent>

      <CardActions>
        <Button
          component={Link}
          to="/parent/editInfo"
          className="edit-button"
          startIcon={<EditIcon />}
          sx={{ color: 'secondary.contrastText' }}
        >
          {t('parent.babysitterAd.edit')}
        </Button>
      </CardActions>
    </Card>
  );
};

export const ParentInfo = (props: ParentInfoProps) => {
  const { device } = useDeviceDetect();

  return (
    <Stack
      direction={device !== 'mobile' ? 'row' : 'column'}
      sx={{ width: '100%' }}
      spacing={1}
    >
      <BabysitterAd t={props.t} />
      <Details {...props} />
    </Stack>
  );
};
