import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from '@mui/material';
import { ReactElement } from 'react';

interface UserCardProps {
  name: string;
  children: ReactElement;
  description: string;
  photo: string;
  rating?: ReactElement;
}

export const UserCard = ({
  name,
  photo,
  children,
  description,
  rating,
}: UserCardProps) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const hideButtonPaths = ['/parent/profile'];
  return (
    <>
      <Card
        raised
        sx={{
          maxWidth: '210px',
          padding: '5px',
          background: isDarkMode ? '#444444' : 'main.color'
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
        {!hideButtonPaths.includes(location.pathname) && (
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
          >
            ΕΝΔΙΑΦΕΡΟΜΑΙ
          </Button>
        </CardActions>
      )}
      </Card>
    </>
  );
};
