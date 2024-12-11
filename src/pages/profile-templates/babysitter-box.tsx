import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import './babysitter-box.css';

interface BoxTemplateProps {
  name: string;
  age: string;
  location: string;
  services: string;
  experience: string;
  description: string;
  photo: string;
}

export const BoxTemplateBabysitter: React.FC<BoxTemplateProps> = ({ name, photo, location, services , experience , description, age }) => {
  return (
    <Box className="box-template-babysitter">
      <Box className="photo-name-container">
        <img src={photo} alt={name} />
        <Typography variant="h6" className="name">
          {name}, {age}
        </Typography>
      </Box>
      <hr />
      <Typography variant="body1" className="location">
        Τοποθεσία: {location}
      </Typography>
      <Typography variant="body1" className="services">
        Υπηρεσίες: {services}
      </Typography>
      <Typography variant="body1" className="experience">
        Εμπειρία: {experience}
      </Typography>
      <hr />
      <Typography variant="body2" className="description">
        Περιγραφή: {description}
      </Typography>
      <Button variant="contained" className="interested-button">
        ΕΝΔΙΑΦΕΡΟΜΑΙ
      </Button>
    </Box>
  );
};