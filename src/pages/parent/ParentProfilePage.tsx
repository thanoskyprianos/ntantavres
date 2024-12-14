import {
  useTheme,
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  Typography,
  Box
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ChecklistIcon from '@mui/icons-material/Checklist';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import DeleteIcon from '@mui/icons-material/Delete';
import { Delete } from '@mui/icons-material';

interface profileParent {
  name: string;
  location: string;
  photo: string;
  add: string;
  email: string;
  phoneNumber: string;
}

export const ParentProfilePage: React.FC<profileParent> = ({
  name = "Athanasios Kyprianos",
  location = "Petroupoli",
  photo = "Young_Vito.webp",
  add = "Mylos Club",
  email = "magicthanos@gmail.com",
  phoneNumber = "6946789226"
}) => {
  return (
    <div>
      <Stack direction="column" spacing={3}
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack direction="row" spacing={2}
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 0.5,
              marginTop: 3
            }}>
            <Avatar
              src={photo}
              sx={{
                width: 100,
                height: 100,
                border: '2px solid',
                borderColor: 'primary.main'
              }}
            />
            <div style={{ marginLeft: '20px' }}>
              <Typography variant='h5'>
                {name}
              </Typography>
              <Typography sx={{ fontSize: '20px' }}>
                {location}
              </Typography>
            </div>
          </Box>

          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 0.5,
            marginTop: 3
          }}>
            <Button
              variant="contained"
              className="interested-button"
              startIcon={<CalendarMonthIcon />}
              sx={{
                width: '330px',
                height: '30px'
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
                height: '30px'
              }}
            >
              ΕΝΕΡΓΕΣ ΣΥΝΕΡΓΑΣΙΕΣ
            </Button>
            <Button
              variant="contained"
              className="interested-button"
              startIcon={<ContactPageIcon/>}
              sx={{
                width: '330px',
                height: '30px'
              }}
            >
              ΠΡΟΣΩΡΙΝΕΣ ΑΙΤΗΣΕΙΣ ΠΡΟΣ ΕΠΑΓΓΕΛΜΑΤΙΕΣ
            </Button>
          </Box>
        </Stack>

        <Stack direction="row" spacing={2}
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card className="info-container" variant='outlined'
            sx={{
              width: '370px',
              maxHeight: '380px'
            }}
          >
            <CardHeader
              title="ΠΛΗΡΟΦΟΡΙΕΣ"
            />
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
            </CardContent>

            <CardActions>
              <Button color='error'
                startIcon={<DeleteIcon/>}
              >
                Διαγραφή
              </Button>
              <Button
                className="edit-button"
                startIcon={<EditIcon />}
              >
                Επεξεργασία
              </Button>
              </CardActions>
            </Card>


          <Card className='job-posting' variant='outlined'
            sx={{
              width: 370
            }}
          >
            <CardHeader
              title="ΑΓΓΕΛΙΑ ΕΥΡΕΣΗΣ ΝΤΑΝΤΑΣ"
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                Ηλικία: 6 μηνών
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                Απασχόληση: Πλήρης
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                Περιγραφή
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Ενδιαφέρομαι για νταντά πλήρους απασχόλησης, η οποία θα αναλάβει τη φροντίδα της 6 μηνών κόρης μου στο σπίτι μας στα Πατήσια. Οι ώρες απασχόλησης είναι Δευτέρα έως Σάββατο, από τις 9 το πρωί μέχρι τις 6 το απόγευμα.
              </Typography>
              <Typography gutterBottom variant="h6" component="div">   
                Καθήκοντα και Προσδοκίες:
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Φροντίδα και επίβλεψη του μωρού.
                Προετοιμασία και τάισμα γευμάτων.
                Διατήρηση της καθαριότητας στους χώρους που σχετίζονται με το μωρό.
                Απασχόληση της μικρής με δραστηριότητες κατάλληλες για την ηλικία της.
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                color='error'
                startIcon={<DeleteIcon/>}
              >
                Διαγραφή
              </Button>
              <Button
                className="edit-button"
                startIcon={<EditIcon />}
              >
                Επεξεργασία
              </Button>
            </CardActions>
          </Card>
        </Stack>
      </Stack>
    </div>
  );
};