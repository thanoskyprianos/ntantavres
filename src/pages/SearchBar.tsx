import React from 'react';
import { Button, useTheme, Typography, Autocomplete, TextField, Box, Stack, Slider } from '@mui/material';

const marks = [
  {
    value: 1,
    label: '1',
  },
  {
    value: 2,
    label: '2',
  },
  {
    value: 3,
    label: '3',
  },
  {
    value: 4,
    label: '4',
  },
  {
    value: 5,
    label: '5',
  },
  {
    value: 6,
    label: '6',
  },
  {
    value: 7,
    label: '7',
  },
  {
    value: 8,
    label: '8',
  },
  {
    value: 9,
    label: '9',
  },
  {
    value: 10,
    label: '10',
  },
  {
    value: 11,
    label: '11',
  },
  {
    value: 12,
    label: '12',
  },
];

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

const typeOfUser = [
    { title: 'Επαγγελματίας' },
    { title: 'Γονέας' },
];

interface SearchBarProps {
    showTypeOfUser?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ showTypeOfUser = false }) => {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
  
    return (
      <Box sx={{ padding: 2, width: '300px', marginLeft: '10px', marginRight: 'auto' }}>
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
          {showTypeOfUser && (
            <Autocomplete
              id="type-of-user"
              size="small"
              options={typeOfUser}
              getOptionLabel={(option) => option.title}
              renderInput={(params) => (
                <TextField {...params} label="Είμαι" placeholder="Επιλογή ιδιότητας" />
              )}
            />
          )}
          {!showTypeOfUser && (
            <>
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
                <Slider
                    aria-label="Months"
                    defaultValue={30}
                    valueLabelDisplay="auto"
                    shiftStep={30}
                    step={1}
                    min={1}
                    max={12}
                    marks={marks}
                />
            </>
          )}
          <Box sx={{ mt: 2 }}>

          </Box>
          <Button
            sx={{
              bgcolor: 'primary.main',
              color: isDarkMode ? '#fff' : '#000',
              background: isDarkMode ? 'linear-gradient(to right, #5361ff, #11508e)' : 'linear-gradient(to right, #aeb5ff, #6496c8)',
            }}
          >
            ΑΝΑΖΗΤΗΣΗ
          </Button>
        </Stack>
      </Box>
    );
};