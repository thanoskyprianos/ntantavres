import React, { useState } from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';

export const QuestionsPage = () => {
    const [activeBox, setActiveBox] = useState('box1');

    return (
        <div>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 4 }}>
            <Button
              variant="contained"
              onClick={() => setActiveBox('box1')}
              sx={{
                fontSize: '20px',
                marginRight: 2,
                backgroundColor: activeBox === 'box1' ? '#aeb5ff' : '#3a3a3a',
                color: activeBox === 'box1' ? 'white' : 'default',
                border: activeBox === 'box1' ? '2px solid #5361ff' : '2px solid transparent',
              }}
            >
              ΓΟΝΕΙΣ
            </Button>
            <Button
              variant="contained"
              onClick={() => setActiveBox('box2')}
              sx={{
                fontSize: '20px',
                backgroundColor: activeBox === 'box2' ? '#aeb5ff' : '#3a3a3a',
                color: activeBox === 'box2' ? 'white' : 'default',
                border: activeBox === 'box2' ? '2px solid #5361ff' : '2px solid transparent',
              }}
            >
                ΕΠΑΓΓΕΛΜΑΤΙΕΣ
            </Button>
          </Box>
            {activeBox === 'box1' && (
                <Box
                    sx={{
                        padding: '30px',
                        backgroundColor: 'background.paper',
                        border: '1px solid grey',
                        borderRadius: '8px',
                        boxShadow: 3,
                        marginLeft: '40px',
                        marginRight: '40px',
                        mt: 4,
                    }}
                >
                    <Typography variant='h4'>
                        Συχνές Ερωτήσεις από γονείς/κηδεμόνες
                    </Typography>
                    <Typography variant='h5'>
                        1. Ποια η διαδικασία που πρέπει να ακολουθηθεί για την εύρεση νταντάς; 
                    </Typography>
                    <Typography variant='h6' color='text.secondary'>
                        Οι γονείς μπορούν να αναρτήσουν αγγελίες και να χρησιμοποιήσουν τα φίλτρα αναζήτησης για να βρουν νταντάδες που πληρούν τα κριτήριά τους. Αφού βρουν υποψήφιους επαγγελματίες, μπορούν να κλείσουν ραντεβού γνωριμίας και να αποστείλουν αιτήματα συνεργασίας.
                    </Typography>
                    <Typography variant='h5'>
                        2. Ποια κριτήρια πρέπει να ικανοποιούνται για την πρόσληψη επαγγελματία/νταντας;
                    </Typography>
                    <Typography variant='h6' color='text.secondary'>
                        Οι γονείς πρέπει να βεβαιωθούν ότι οι νταντάδες διαθέτουν τα απαραίτητα προσόντα και εμπειρία, καθώς και να ελέγξουν τις συστάσεις τους.
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
            )}
            {activeBox === 'box2' && (
                <Box
                    sx={{
                        padding: '30px',
                        backgroundColor: 'background.paper',
                        border: '1px solid grey',
                        borderRadius: '8px',
                        boxShadow: 3,
                        marginLeft: '40px',
                        marginRight: '40px',
                        mt: 4,
                    }}
                >
                    <Typography variant='h4'>
                        Συχνές Ερωτήσεις από επαγγελματίες/νταντάδες
                    </Typography>
                    <Typography variant='h5'>
                        1. Πώς μπορώ να βρω αγγελίες που με ενδιαφέρουν;
                    </Typography>
                    <Typography variant='h6' color='text.secondary'>
                        Οι επαγγελματίες μπορούν να χρησιμοποιήσουν τα φίλτρα αναζήτησης για να βρουν αγγελίες που πληρούν τα κριτήριά τους. Μπορούν επίσης να αναρτήσουν το προφίλ τους και να περιμένουν αιτήματα από γονείς.
                    </Typography>
                    <Typography variant='h5'>
                        2. Πώς μπορώ να επικοινωνήσω με τους γονείς;
                    </Typography>
                    <Typography variant='h6' color='text.secondary'>
                        Μέσα από την πλατφόρμα, μπορείτε να στείλετε μηνύματα στους γονείς και να προγραμματίσετε ραντεβού γνωριμίας.
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
            )}
        </div>
    );
};