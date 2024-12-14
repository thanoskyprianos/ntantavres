import React from 'react';
import { Typography, Autocomplete, TextField, Box, Stack } from '@mui/material';

const locations = [
  { title: 'Αγία Παρασκευή Αττικής' },
  { title: 'Δήμος Αγίας Βαρβάρας Αττικής' },
  { title: 'Δήμος Αγίων Αναργύρων - Καματερού' },
  { title: 'Δήμος Αθηναίων' },
  { title: 'Αιγάλεω' },
  { title: 'Αίγινα' },
  { title: 'Δήμος Ασπροπύργου' },
  { title: 'Δήμος Αχαρνών' },
  { title: 'Δήμος Βάρης - Βούλας - Βουλιαγμένης' },
  { title: 'Βριλήσσια' },
  { title: 'Δήμος Βύρωνα' },
  { title: 'Δήμος Γαλατσίου' },
  { title: 'Δήμος Γλυφάδας' },
  { title: 'Δήμος Δάφνης - Υμηττού' },
  { title: 'Δήμος Διονύσου' },
  { title: 'Δήμος Ελευσίνας' },
  { title: 'Δήμος Ελληνικού - Αργυρούπολης' },
  { title: 'Δήμος Ζωγράφου' },
  { title: 'Δήμος Ηλιούπολης' },
  { title: 'Δήμος Καισαριανής' },
  { title: 'Δήμος Καλλιθέας' },
  { title: 'Δήμος Κερατσινίου - Δραπετσώνας' },
  { title: 'Δήμος Κηφισιάς' },
  { title: 'Δήμος Κορυδαλλού' },
  { title: 'Δήμος Κρωπίας' },
  { title: 'Κύθηρα' },
  { title: 'Δήμος Λαυρεωτικής' },
  { title: 'Δήμος Μάνδρας - Ειδυλλίας' },
  { title: 'Μαραθώνας' },
  { title: 'Δήμος Μεγαρέων' },
  { title: 'Δήμος Μοσχάτου - Ταύρου' },
  { title: 'Νέα Ιωνία Αττικής' },
  { title: 'Νέα Σμύρνη' },
  { title: 'Δήμος Νίκαιας - Αγίου Ιωάννη Ρέντη' },
  { title: 'Δήμος Παιανίας' },
  { title: 'Δήμος Παλαιού Φαλήρου' },
  { title: 'Δήμος Παλλήνης Αττικής' },
  { title: 'Δήμος Παπάγου-Χολαργού' },
  { title: 'Δήμος Πειραιώς' },
  { title: 'Δήμος Πεντέλης' },
  { title: 'Δήμος Περάματος Αττικής' },
  { title: 'Περιστέρι Αττικής' },
  { title: 'Δήμος Πεύκης-Λυκόβρυσης' },
  { title: 'Πόρος' },
  { title: 'Δήμος Ραφήνας - Πικερμίου' },
  { title: 'Σαλαμίνα' },
  { title: 'Δήμος Σαρωνικού' },
  { title: 'Δήμος Σπάτων - Αρτέμιδος' },
  { title: 'Σπέτσες' },
  { title: 'Δήμος Τροιζηνίας' },
  { title: 'Ύδρα' },
  { title: 'Δήμος Φιλαδελφείας-Χαλκηδόνος' },
  { title: 'Δήμος Φιλοθέης-Ψυχικού' },
  { title: 'Δήμος Φυλής' },
  { title: 'Δήμος Χαϊδαρίου' },
  { title: 'Χαλάνδρι' },
];

const employmentTypes = [
  { title: 'Πλήρης' },
  { title: 'Μερική' },
];

const ages = [
  { title: '0-12 μηνών' },
  { title: '12-24 μηνών' },
  { title: '24-36 μηνών' },
];

const services = [
  { title: 'Μαγείρεμα' },
  { title: 'Παιχνίδι' },
  { title: 'Μαθηματικά' },
  { title: 'Πιάνο' },
  { title: 'Γλώσσα' },
  { title: 'Μελέτη Βιβλίων' },
  { title: 'Σιδέρωμα ρούχων' },
  { title: 'Συνοδεία σε ταξίδια' },
  { title: 'Δημιουργική απασχόληση' },
  { title: 'Δουλειές γύρω από το παιδί' },
];

export const BabysitterPage = () => {
  return (
    <Box sx={{ padding: 2, width: '300px', marginLeft: '10px', marginRight: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Εύρεση αγγελίας
      </Typography>
      <Stack spacing={2}>
        <Autocomplete
          multiple
          id="size-small-outlined-multi"
          size="small"
          options={locations}
          getOptionLabel={(option) => option.title}
          defaultValue={[locations[0]]}
          renderInput={(params) => (
            <TextField {...params} label="Περιοχή" placeholder="Επιλογή περιοχής" />
          )}
        />
        <Autocomplete
          id="employment-type"
          size="small"
          options={employmentTypes}
          getOptionLabel={(option) => option.title}
          renderInput={(params) => (
            <TextField {...params} label="Απασχόληση" placeholder="Επιλογή τύπου απασχόλησης" />
          )}
        />
        <Autocomplete
          multiple
          id="ages"
          size="small"
          options={ages}
          getOptionLabel={(option) => option.title}
          renderInput={(params) => (
            <TextField {...params} label="Ηλικίες" placeholder="Επιλογή ηλικιών" />
          )}
        />
        <Autocomplete
          multiple
          id="services"
          size="small"
          options={services}
          getOptionLabel={(option) => option.title}
          renderInput={(params) => (
            <TextField {...params} label="Άλλες Υπηρεσίες" placeholder="Επιλογή υπηρεσιών" />
          )}
        />
      </Stack>
    </Box>
  );
};