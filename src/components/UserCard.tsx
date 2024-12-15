import React, { useState } from 'react';
import { Card, CardContent, CardActions, Button, Typography, Divider, Avatar, CardHeader, Box, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate, Link } from 'react-router-dom';

interface UserCardProps {
  name: string;
  children: React.ReactNode;
  description: string;
  photo: string;
  rating?: React.ReactNode;
  showButton?: boolean;
}

export const UserCard = ({
  name,
  photo,
  children,
  description,
  rating,
  showButton = true,
}: UserCardProps) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  return (
    <Card
      raised
      sx={{
        maxWidth: '210px',
        padding: '5px',
        background: isDarkMode ? '#444444' : 'main.color',
      }}
    >
      <CardHeader
        disableTypography
        avatar={<Avatar src={photo} alt={name} />}
        title={
          <Typography variant="h6" className="name">
            {name}
          </Typography>
        }
        subheader={rating}
      />
      <Divider />
      <CardContent>{children}</CardContent>
      <Divider />
      <CardContent>
        <Typography variant="body2" className="description">
          <strong>Περιγραφή:</strong> {description}
        </Typography>
      </CardContent>
      {showButton && (
        <CardActions sx={{ display: 'flex', placeContent: 'center' }}>
          <Button
            variant="contained"
            className="interested-button"
            sx={{
              bgcolor: 'primary.main',
              width: '170px',
              color: isDarkMode ? '#fff' : '#000',
              background: isDarkMode ? 'linear-gradient(to right, #5361ff, #11508e)' : 'linear-gradient(to right, #aeb5ff, #6496c8)',
            }}
            component={Link}
            to='/intrested'
          >
            ΕΝΔΙΑΦΕΡΟΜΑΙ
          </Button>
        </CardActions>
      )}
    </Card>
  );
};