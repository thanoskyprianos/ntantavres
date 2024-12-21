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

// interface profileParent {
//   name: string;
//   location: string;
//   photo: string;
//   add: string;
//   email: string;
//   phoneNumber: string;
// }

export const ParentProfilePage = ({
  firstName,
  lastName,
  email,
}: UserDetails) => {
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
            {/*<Avatar*/}
            {/*  src={photo}*/}
            {/*  sx={{*/}
            {/*    width: 100,*/}
            {/*    height: 100,*/}
            {/*    border: '2px solid',*/}
            {/*    borderColor: 'primary.main',*/}
            {/*  }}*/}
            {/*/>*/}
            <div style={{ marginLeft: '20px' }}>
              <Typography variant="h5">
                {firstName} {lastName}
              </Typography>
              {/*<Typography sx={{ fontSize: '20px' }}>{location}</Typography>*/}
            </div>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 0.5,
              marginTop: 3,
            }}
          >
            <Button
              component={Link}
              to="/parent/scheduledMeetings"
              variant="contained"
              className="interested-button"
              startIcon={<CalendarMonthIcon />}
              sx={{
                width: '330px',
                height: '30px',
              }}
            >
              ΠΡΟΓΡΑΜΜΑΤΙΣΜΕΝΑ ΡΑΝΤΕΒΟΥ ΓΝΩΡΙΜΙΑΣ
            </Button>
            <Button
              component={Link}
              to="/parent/activeCollabs"
              variant="contained"
              className="interested-button"
              startIcon={<ChecklistIcon />}
              sx={{
                width: '330px',
                height: '30px',
              }}
            >
              ΕΝΕΡΓΕΣ ΣΥΝΕΡΓΑΣΙΕΣ
            </Button>
            <Button
              component={Link}
              to="/parent/tempRequest"
              variant="contained"
              className="interested-button"
              startIcon={<ContactPageIcon />}
              sx={{
                width: '330px',
                height: '30px',
              }}
            >
              ΠΡΟΣΩΡΙΝΕΣ ΑΙΤΗΣΕΙΣ ΠΡΟΣ ΕΠΑΓΓΕΛΜΑΤΙΕΣ
            </Button>
            <Button
              variant="contained"
              className="interested-button"
              startIcon={<HistoryIcon />}
              sx={{
                width: '330px',
                height: '30px',
              }}
            >
              ΙΣΤΟΡΙΚΟ
            </Button>
            <Button
              component={Link}
              to="/parent/paymentPage"
              variant="contained"
              className="interested-button"
              startIcon={<Payment />}
              sx={{
                width: '330px',
                height: '30px',
              }}
            >
              ΠΛΗΡΩΜΗ
            </Button>
          </Box>
        </Stack>

        <Stack
          direction="row"
          spacing={2}
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Card
            className="info-container"
            variant="outlined"
            sx={{
              width: '370px',
              maxHeight: '380px',
            }}
          >
            <CardHeader title="ΠΛΗΡΟΦΟΡΙΕΣ" />
            <CardContent>
              <Typography variant="h6" sx={{ color: 'text.main' }}>
                Διεύθυνση κατοικίας:
              </Typography>
              {/*<Typography variant="body1" sx={{ color: 'text.secondary' }}>*/}
              {/*  {add}*/}
              {/*</Typography>*/}
              <Typography variant="h6" sx={{ color: 'text.main' }}>
                Τηλέφωνο Επικοινωνίας:
              </Typography>
              {/*<Typography variant="body1" sx={{ color: 'text.secondary' }}>*/}
              {/*  {phoneNumber}*/}
              {/*</Typography>*/}
              <Typography variant="h6" sx={{ color: 'text.main' }}>
                Ηλεκτρονική Διεύθυνση:
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
                Επεξεργασία
              </Button>
            </CardActions>
          </Card>

          <Box sx={{ padding: 0 }}>
            <Card
              className="job-posting"
              variant="outlined"
              sx={{ width: 320 }}
            >
              <CardHeader title="ΑΓΓΕΛΙΑ ΕΥΡΕΣΗΣ ΝΤΑΝΤΑΣ" />
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
                  Επεξεργασία
                </Button>
                <Button
                  className="edit-button"
                  color="success"
                  startIcon={<AddCircleOutline />}
                  onClick={handleClickOpen}
                >
                  Δημιουργία Αγγελίας
                </Button>
              </CardActions>
            </Card>

            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Δημιουργία Αγγελίας</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Προσοχή η προηγούμενη σας αγγελία θα διαγραφεί.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleClose}
                  component={Link}
                  to="/parent/createORedit"
                  sx={{ color: 'secondary.contrastText' }}
                >
                  Εντάξει
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </Stack>
      </Stack>
    </div>
  );
};
