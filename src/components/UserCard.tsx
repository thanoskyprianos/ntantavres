import React from 'react';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  SxProps,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface UserCardProps {
  name: string;
  children: React.ReactNode;
  description: string;
  photo: string;
  rating?: React.ReactNode;
  showButton?: boolean;
  sx?: SxProps;
}

export const UserCard = ({
  name,
  photo,
  children,
  description,
  rating,
  showButton = true,
  sx,
}: UserCardProps) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  return (
    <Card
      sx={{
        ...sx,
        transition: 'border 0.8s, box-shadow 0.6s',
        border: '4px solid transparent',
        '&:hover': {
          borderImage: isDarkMode
            ? 'linear-gradient(to right, #727eff, #1a81e9) 1'
            : 'linear-gradient(to right, #c3c8ff, #86c3ff) 1',
          boxShadow: isDarkMode
            ? '0 8px 16px rgba(255, 255, 255, 0.2)'
            : '0 8px 16px rgba(0, 0, 0, 0.2)',
        },
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
              width: '270px',
              fontrWeight: 'bold',
              color: isDarkMode ? '#fff' : '#000',
              background: isDarkMode
                ? 'linear-gradient(to right, #5361ff, #11508e)'
                : 'linear-gradient(to right, #aeb5ff, #6496c8)',
            }}
          >
            ΕΝΔΙΑΦΕΡΟΜΑΙ
          </Button>
        </CardActions>
      )}
    </Card>
  );
};
