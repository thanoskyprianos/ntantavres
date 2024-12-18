import React from 'react';
import { Button, useTheme, Typography, Autocomplete, TextField, Box, Stack, Slider, Tooltip, IconButton, FormControlLabel, Radio, RadioGroup, Divider, Checkbox } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useState } from 'react';
import { Clear, Search } from '@mui/icons-material';

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
    isParentPage?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ showTypeOfUser = false, isParentPage = false }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const [selectedAge, setSelectedAge] = useState<string>('0-6 μηνών');
  const [selectedLocation, setSelectedLocation] = useState<{ title: string }[]>([locations[0]]);
  const [selectedEmploymentType, setSelectedEmploymentType] = useState<string | null>(null);
  const [selectedServices, setSelectedServices] = useState<{ title: string }[]>([]);
  const [months, setMonths] = useState<number>(30);
  const [selectedAgeProf, setSelectedAgeProf] = useState<string[]>([]);
  const [selectedProfileOptions, setSelectedProfileOptions] = useState<string[]>([]);

  const handleButtonClick = (buttonType: string) => {
    setSelectedButton(buttonType);
  };

  const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAge(event.target.value);
  };

  const handleAgeProfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedAgeProf((prev) =>
      prev.includes(value) ? prev.filter((option) => option !== value) : [...prev, value]
    );
  };

  const handleProfileOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedProfileOptions((prev) =>
      prev.includes(value) ? prev.filter((option) => option !== value) : [...prev, value]
    );
  };

  const handleResetFilters = () => {
    setSelectedButton(null);
    setSelectedAge('0-6 μηνών');
    setSelectedAgeProf([]);
    setSelectedLocation([locations[0]]);
    setSelectedEmploymentType(null);
    setSelectedServices([]);
    setMonths(30);
    setSelectedProfileOptions([]);
  };


  return (
    <Box 
      sx={{ 
        padding: 3,
        width: '350px',
        marginLeft: '10px', 
        marginRight: 'auto',
        backgroundColor: isDarkMode ? 'rgba(58, 58, 58, 0.95)' : 'rgba(255, 255, 255, 0.95)',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        backdropFilter: 'blur(8px)',
      }}
    >  
      <Stack spacing={2}>
        <Button
          onClick={handleResetFilters}
          startIcon={<Clear />}
          sx={{
            height: '44px',
            borderRadius: '8px',
            fontWeight: 600,
            color: isDarkMode ? 'white' : 'black',
            background: isDarkMode 
              ? 'linear-gradient(45deg, #ff1744 30%, #ff616f 90%)'
              : 'linear-gradient(45deg, #ff8a80 30%, #ff5252 90%)',
            transition: 'all 0.3s',
            '&:hover': {
              transform: 'translateY(-1px)',
              boxShadow: '0 5px 8px 2px rgba(255, 23, 68, .3)',
            }
          }}
        >
          ΚΑΘΑΡΙΣΜΟΣ ΦΙΛΤΡΩΝ
        </Button>
        <Divider></Divider>
        <Autocomplete
          multiple
          id="size-small-outlined-multi"
          size="small"
          options={locations}
          getOptionLabel={(option) => option.title}
          value={selectedLocation}
          onChange={(event, newValue) => setSelectedLocation(newValue)}
          renderInput={(params) => (
            <TextField {...params} label="Περιοχή" placeholder="Επιλογή περιοχής" />
          )}
        />
        {showTypeOfUser && (
        <>
          <Typography variant="body2" color="textSecondary">
              Είμαι
            <Tooltip title="Πραγματοποίηση αναζήτησης ως γονιός (εύρεση νταντάς)
                            ή Πραγματοποίηση αναζήτησης ως επαγγελματίας (εύρεση αγγελίας γονέα)">
              <IconButton>
                <InfoIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Typography>
          <Stack direction={'row'} spacing={1}>
            <Button
              variant={selectedButton === 'Γονέας' ? 'contained' : 'outlined'}
              onClick={() => handleButtonClick('Γονέας')}
              sx={{
                width: '150px',
                bgcolor: selectedButton === 'Γονέας' ? '#1976d2' : 'inherit',
                color: selectedButton === 'Γονέας' ? '#fff' : 'inherit',
              }}
            >
              Γονέας
            </Button>
            <Button
              variant={selectedButton === 'Επαγγελματίας' ? 'contained' : 'outlined'}
              onClick={() => handleButtonClick('Επαγγελματίας')}
              sx={{
                width: '150px',
                bgcolor: selectedButton === 'Επαγγελματίας' ? '#1976d2' : 'inherit',
                color: selectedButton === 'Επαγγελματίας' ? '#fff' : 'inherit',
              }}
            >
              Επαγγελματίας
            </Button>
          </Stack>
        </>
        )}
        {!showTypeOfUser && (
          <>
              <Autocomplete
                  multiple
                  id="services"
                  size="small"
                  options={services}
                  getOptionLabel={(option) => option.title}
                  value={selectedServices}
                  onChange={(event, newValue) => setSelectedServices(newValue)}
                  renderInput={(params) => (
                      <TextField {...params} label="Άλλες Υπηρεσίες" placeholder="Επιλογή υπηρεσιών" />
                  )}
              />

              <Divider></Divider>
              <Typography variant="body2" color="textSecondary">
                Ηλικία παιδιού
              </Typography>
              <RadioGroup value={selectedAge} onChange={handleAgeChange}>
                <FormControlLabel value="0-6 μηνών" control={<Radio />} label="0-6 μηνών" />
                <FormControlLabel value="6-12 μηνών" control={<Radio />} label="6-12 μηνών" />
                <FormControlLabel value="12-24 μηνών" control={<Radio />} label="12-24 μηνών" />
              </RadioGroup>

              <Divider></Divider>
              <Typography variant="body2" color="textSecondary">
                Ηλικία επαγγελματία
              </Typography>
              <Stack>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedAgeProf.includes('18-24')}
                      onChange={handleAgeProfChange}
                      value="18-24"
                    />
                  }
                  label="18-24 ετών"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedAgeProf.includes('24-35')}
                      onChange={handleAgeProfChange}
                      value="24-35"
                    />
                  }
                  label="24-35 ετών"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedAgeProf.includes('35-50')}
                      onChange={handleAgeProfChange}
                      value="35-50"
                    />
                  }
                  label="35-50 ετών"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedAgeProf.includes('50+')}
                      onChange={handleAgeProfChange}
                      value="50+"
                    />
                  }
                  label="50+ ετών"
                />
              </Stack>

              <Divider></Divider>
              <Typography variant="body2" color="textSecondary">
                Μήνες
                <Tooltip title="Πλήθος μηνών για τους οποίους επιθυμώ την υπηρεσία">
                  <IconButton>
                    <InfoIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Typography>
              <Slider
                  aria-label="Months"
                  value={months}
                  onChange={(event, newValue) => setMonths(newValue as number)}
                  valueLabelDisplay="auto"
                  shiftStep={30}
                  step={1}
                  min={1}
                  max={12}
                  marks={marks}
              />

              <Divider></Divider>
              <Typography variant="body2" color="textSecondary">
                Τύπος απασχόλησης
                <Tooltip title="Μερική απασχόληση: 4 ώρες/ημέρα - Πλήρης απασχόληση: 8 ώρες/ημέρα">
                  <IconButton>
                    <InfoIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Typography>

              <Stack direction={'row'} spacing={1}>
                <Button
                  variant={selectedButton === 'Μερική' ? 'contained' : 'outlined'}
                  onClick={() => handleButtonClick('Μερική')}
                  sx={{
                    width: '150px',
                    bgcolor: selectedButton === 'Μερική' ? '#1976d2' : 'inherit',
                    color: selectedButton === 'Μερική' ? '#fff' : 'inherit',
                  }}
                >
                  Μερική
                </Button>
                <Button
                  variant={selectedButton === 'Πλήρης' ? 'contained' : 'outlined'}
                  onClick={() => handleButtonClick('Πλήρης')}
                  sx={{
                    width: '150px',
                    bgcolor: selectedButton === 'Πλήρης' ? '#1976d2' : 'inherit',
                    color: selectedButton === 'Πλήρης' ? '#fff' : 'inherit',
                  }}
                >
                  Πλήρης
                </Button>
              </Stack>
          </>
        )}
        {isParentPage && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body2" color="textSecondary">
              Προβολή προφίλ με:
            </Typography>
            <Stack>
            <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedProfileOptions.includes('Προφίλ με συστατικές επιστολές')}
                    onChange={handleProfileOptionChange}
                    value="Προφίλ με συστατικές επιστολές"
                  />
                }
                label="Προφίλ με συστατικές επιστολές"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedProfileOptions.includes('Προφίλ με αξιολογήσεις')}
                    onChange={handleProfileOptionChange}
                    value="Προφίλ με αξιολογήσεις"
                  />
                }
                label="Προφίλ με αξιολογήσεις"
              />
              </Stack>
          </>
        )}

        <Divider></Divider>
        <Stack spacing={2} mt={2}>
          <Button
            startIcon={<Search />}
            sx={{
              height: '44px',
              borderRadius: '8px',
              fontWeight: 600,
              color: isDarkMode ? 'white' : 'black',
              background: isDarkMode 
                ? 'linear-gradient(45deg, #5361ff 30%, #11508e 90%)'
                : 'linear-gradient(45deg, #aeb5ff 30%, #6496c8 90%)',
              transition: 'all 0.3s',
              '&:hover': {
                transform: 'translateY(-1px)',
                boxShadow: '0 5px 8px 2px rgba(83, 97, 255, .3)',
              }
            }}
          >
            ΑΝΑΖΗΤΗΣΗ
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};
