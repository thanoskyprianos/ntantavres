import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import './parent-box.css';

interface BoxTemplateProps {
  name: string;
  location: string;
  duration: string;
  children: string;
  description: string;
  photo: string;
}

export const BoxTemplateParent: React.FC<BoxTemplateProps> = ({ name, photo, location, duration, children, description }) => {
  return (
    <Box className="box-template-parent">
      <Box className="photo-name-container">
        <img src={photo} alt={name} />
        <Typography variant="h6" className="name">
          {name}
        </Typography>
      </Box>
      <hr />
      <Typography variant="body1" className="location">
        Τοποθεσία: {location}
      </Typography>
      <Typography variant="body1" className="duration">
        Διάρκεια: {duration}
      </Typography>
      <Typography variant="body1" className="children">
        Παιδιά: {children}
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