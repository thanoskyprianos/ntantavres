import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { BoxTemplateParent } from './profile-templates/parent-box';
import { BoxTemplateBabysitter } from './profile-templates/babysitter-box';
import './HomePage.css';

export const HomePage = () => {
  return (
    <React.Fragment>
      <Box className="parents">
        <BoxTemplateParent 
        name="Athanasios"
        location="Petroupoli"
        duration="6 months"
        children="5 children"
        description="Looking for a babysitter"
        photo="Young_Vito.webp"
        />
      </Box>
      <Box className="babysitters">
        <BoxTemplateBabysitter 
          name="Maria"
          age="20"
          location="Athens"
          services="Alot"
          experience="3 years"
          description="Experienced babysitter"
          photo="maria1.jpg"
        />
      </Box>
      <Box className="container">
        <Typography variant="h5" gutterBottom>
          Είμαι..
        </Typography>
        <Button
          component={Link}
          to="/parent"
          className="button"
        >
          Γονέας/Κηδεμόνας
        </Button>
        <Button
          component={Link}
          to="/babysitter"
          className="button"
        >
          Επαγγελματίας/Νταντά
        </Button>
      </Box>
    </React.Fragment>
  );
};