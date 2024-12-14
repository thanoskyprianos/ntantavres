import { Box, Button, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const FAQbabysitters = () => {
  return (
    <div>
    <Box
      sx={{
        padding: '30px',
        backgroundColor: 'background.paper',
        border: '1px solid grey',
        borderRadius: '8px',
        boxShadow: 3,
        marginLeft: '40px',
        marginRight: '40px',
      }}
    >
        <Typography variant='h4'>
            Συχνές Ερωτήσεις από επαγγελματίες/νταντάδες
        </Typography>
        <Typography variant='h5'>
            1. Ποια η διαδικασία που πρέπει να ακολουθηθεί για την εύρεση πελάτη;
        </Typography>
        <Typography variant='h6' color='text.secondary'>
            Ο επαγγελματίας δημιουργεί λογαριασμό στην πλατφόρμα, συμπληρώνει το προφίλ του με πληροφορίες όπως βιογραφικό, εμπειρία, ειδίκευση και διαθεσιμότητα, και έπειτα οι γονείς μπορούν να επικοινωνήσουν μαζί του μέσω αιτήματος συνεργασίας.
        </Typography>
        <Typography variant='h5'>
            2. Ποια δικαιολογητικά απαιτούνται για την εγγραφή μου στην πλατφόρμα;
        </Typography>
        <Typography variant='h6' color='text.secondary'>
            Απαιτείται ταυτοποίηση με έγγραφα όπως ταυτότητα ή διαβατήριο και, ενδεχομένως, πτυχία, πιστοποιήσεις πρώτων βοηθειών, και συστάσεις από προηγούμενους εργοδότες.
        </Typography>
        <Typography variant='h5'>
            3. Πώς και πότε πραγματοποιείται η πληρωμή από το σύστημα;
        </Typography>
        <Typography variant='h6' color='text.secondary'>
            Η πληρωμή γίνεται στο τέλος κάθε μήνα, αφού ο γονέας πιστοποιήσει την ολοκλήρωση της εργασίας. Θα λάβετε ένα ψηφιακό voucher που μπορείτε να εξαργυρώσετε απευθείας μέσω της πλατφόρμας.
        </Typography>
        <Typography variant='h5'>
            4. Πώς μπορώ να διαμορφώσω το ημερολόγιο με τη διαθεσιμότητά μου;
        </Typography>
        <Typography variant='h6' color='text.secondary'>
            Μέσα από τον λογαριασμό σας, έχετε πρόσβαση στο εργαλείο ημερολογίου. Μπορείτε να δηλώσετε διαθέσιμες ώρες και ημέρες, να προγραμματίσετε ρεπό ή αλλαγές, και να ενημερώσετε τις αγγελίες σας.
        </Typography>
    </Box>
    </div>
  );
}