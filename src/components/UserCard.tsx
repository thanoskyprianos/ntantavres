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
  return (
    <>
      <Card
        raised
        sx={{
          maxWidth: '210px',
          padding: '5px',
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
            Περιγραφή: {description}
          </Typography>
        </CardContent>
        <CardActions sx={{ display: 'flex', placeContent: 'center' }}>
          <Button
            variant="contained"
            className="interested-button"
            sx={{
              bgcolor: 'primary.main',
              width: '170px',
            }}
          >
            ΕΝΔΙΑΦΕΡΟΜΑΙ
          </Button>
        </CardActions>
      </Card>
    </>
  );
};
