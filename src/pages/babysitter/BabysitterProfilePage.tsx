import React from 'react';
import {
  useTheme,
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ChecklistIcon from '@mui/icons-material/Checklist';
import HistoryIcon from '@mui/icons-material/History';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import EuroIcon from '@mui/icons-material/Euro';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { MonthCalendar } from '@mui/x-date-pickers/MonthCalendar';
import Rating from '@mui/material/Rating';
import { Link } from 'react-router-dom';

interface profileBabysitter {
  name: string;
  location: string;
  photo: string;
  add: string;
  email: string;
  phoneNumber: string;
  age: string;
  reviews: string;
}

export const BabysitterProfilePage: React.FC<profileBabysitter> = ({
  name = 'Katerina Zerva',
  location = 'Galatsi',
  photo = 'maria1.jpg',
  add = 'Αρχιμήδους 2',
  email = 'katerinazerva@gmail.com',
  phoneNumber = '6912345678',
  reviews = '25',
}) => {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
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
            <Avatar
              src={photo}
              sx={{
                width: 100,
                height: 100,
                border: '2px solid',
                borderColor: 'primary.main',
              }}
            />
            <div style={{ marginLeft: '20px' }}>
              <Typography variant="h5">{name}</Typography>
              <Typography sx={{ fontSize: '20px' }}>{location}</Typography>
              <Stack
                direction="column"
                spacing={0}
                sx={{
                  alignItems: 'center',
                }}
              >
                <Button component={Link} to='/ratings'>
                <Rating value={4} readOnly size="small" />
                ({reviews})
                </Button>
              </Stack>
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
              variant="contained"
              className="interested-button"
              startIcon={<FilePresentIcon />}
              sx={{
                width: '330px',
                height: '30px',
              }}
            >
              ΣΥΣΤΑΤΙΚΕΣ ΕΠΙΣΤΟΛΕΣ
            </Button>
            <Button
              variant="contained"
              className="interested-button"
              startIcon={<UploadFileIcon />}
              sx={{
                width: '330px',
                height: '30px',
              }}
            >
              ΑΝΑΡΤΗΣΗ ΣΥΣΤΑΤΙΚΗΣ ΕΠΙΣΤΟΛΗΣ
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
              variant="contained"
              className="interested-button"
              startIcon={<EuroIcon />}
              sx={{
                width: '330px',
                height: '30px',
              }}
            >
              ΕΙΣΕΡΧΟΜΕΝΑ VOUCHER
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
              maxHeight: '550px',
            }}
          >
            <CardHeader title="ΠΛΗΡΟΦΟΡΙΕΣ" />
            <CardContent>
              <Typography variant="h6" sx={{ color: 'text.main' }}>
                Διεύθυνση κατοικίας:
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                {add}
              </Typography>
              <Typography variant="h6" sx={{ color: 'text.main' }}>
                Τηλέφωνο Επικοινωνίας:
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                {phoneNumber}
              </Typography>
              <Typography variant="h6" sx={{ color: 'text.main' }}>
                Ηλεκτρονική Διεύθυνση:
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                {email}
              </Typography>

              <Typography variant="h6" sx={{ color: 'text.main' }}>
                Εμπειρία:
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                Νηπιαγωγός, Πρώτες βοήθειες.
              </Typography>

              <Typography variant="h6" sx={{ color: 'text.main' }}>
                Επίπεδο σπουδών:
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                Τριτοβάθμια εκπαίδευση
              </Typography>

              <Typography variant="h6" sx={{ color: 'text.main' }}>
                Λίγα λόγια για εμένα:
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                Αξιόπιστη, υπομονετική νταντά με αγάπη για τα παιδιά και
                εμπειρία στη δημιουργική απασχόληση.
              </Typography>
            </CardContent>

            <CardActions>
              <Button className="edit-button" startIcon={<EditIcon />}>
                Επεξεργασία
              </Button>
            </CardActions>
          </Card>

          <Card variant="outlined">
            <CardHeader title="ΗΜΕΡΟΛΟΓΙΟ ΔΙΑΘΕΣΙΜΟΤΗΤΑΣ" />
              <DemoContainer components={['YearCalendar', 'MonthCalendar']}>
                <DemoItem>
                  <MonthCalendar value={selectedDate} onChange={handleDateChange} />
                </DemoItem>
              </DemoContainer>
          </Card>

        </Stack>
      </Stack>
    </div>
  );
};
