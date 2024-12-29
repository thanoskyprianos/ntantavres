import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ChecklistIcon from '@mui/icons-material/Checklist';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import {
  AddCircleOutline,
  History as HistoryIcon,
  Payment,
} from '@mui/icons-material';
import { UserCard } from '@components/UserCard.tsx';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserDetails } from '@/types/UserDetails.ts';
import { useTranslation } from 'react-i18next';
import { ActionButton } from '@components/util/IconLabelButton.tsx';
import { Base64String } from '@/types/Avatar.ts';
import { AvatarDisplay } from '@components/util/AvatarDisplay.tsx';

// interface profileParent {
//   name: string;
//   location: string;
//   photo: string;
//   add: string;
//   email: string;
//   phoneNumber: string;
// }

interface ParentProfilePageProps extends UserDetails {
  avatar?: Base64String;
}

export const ParentProfilePage = ({
  firstName,
  lastName,
  email,
  address,
  phoneNumber,
  avatar,
}: ParentProfilePageProps) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Stack
        direction="column"
        spacing={3}
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 0.5,
              marginTop: 3,
            }}
          >
            <AvatarDisplay
              avatar={avatar}
              sx={{
                width: 100,
                height: 100,
                border: '2px solid',
                borderColor: 'primary.main',
              }}
            >
              <Typography variant="h3">
                {firstName &&
                  lastName &&
                  firstName.charAt(0).toUpperCase() +
                    lastName.charAt(0).toUpperCase()}
              </Typography>
            </AvatarDisplay>

            <div style={{ marginLeft: '20px' }}>
              <Typography variant="h5">
                {firstName} {lastName}
              </Typography>
              {/*<Typography sx={{ fontSize: '20px' }}>{location}</Typography>*/}
            </div>
          </Box>

          <Stack spacing={0.5}>
            <ActionButton
              label={t('parent.actions.plannedMeetings')}
              icon={<CalendarMonthIcon />}
            />
            <ActionButton
              label={t('parent.actions.activeCollaborations')}
              icon={<ChecklistIcon />}
            />
            <ActionButton
              label={t('parent.actions.temporaryApplications')}
              icon={<ContactPageIcon />}
            />
            <ActionButton
              label={t('parent.actions.history')}
              icon={<HistoryIcon />}
            />
            <ActionButton
              label={t('parent.actions.payment')}
              icon={<Payment />}
            />
          </Stack>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Card
            variant="outlined"
            sx={
              {
                // width: '370px',
                // maxHeight: '380px',
              }
            }
          >
            <CardHeader title={t('parent.info.title')} />
            <CardContent>
              <Typography variant="h6" sx={{ color: 'text.main' }}>
                {t('parent.info.address')}
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                {address}
              </Typography>
              <Typography variant="h6" sx={{ color: 'text.main' }}>
                {t('parent.info.phoneNumber')}
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                {phoneNumber}
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

          <Card variant="outlined">
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
                onClick={handleClickOpen}
              >
                {t('parent.babysitterAd.create')}
              </Button>
            </CardActions>
          </Card>

          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{t('parent.babysitterAd.createTitle')}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                {t('parent.babysitterAd.prompt')}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleClose}
                component={Link}
                to="/parent/createORedit"
                sx={{ color: 'secondary.contrastText' }}
              >
                {t('parent.babysitterAd.ok')}
              </Button>
            </DialogActions>
          </Dialog>
        </Stack>
      </Stack>
    </div>
  );
};
