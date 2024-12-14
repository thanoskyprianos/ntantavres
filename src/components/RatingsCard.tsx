import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Rating,
  Box,
  Typography,
} from '@mui/material';
import { ReactElement } from 'react';

interface RatingElements {
  name: string;
  description: string;
  rating?: ReactElement;
  photo: string;
}

export const RatingCard = ({
  name,
  description,
  rating,
  photo
}: RatingElements) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  return (
    <>
      <Card
        variant="outlined"
        
        raised
        sx={{
            boxShadow: 3,
            maxHeight: '200px',
            width: '500px',
            background: isDarkMode ? '#444444' : 'main.color',
        }}
      >
        <CardHeader
          avatar={<Avatar src={photo} alt={name} 
            sx={{
                height:'40px',
                width:'40px'
            }}
          />}
          title={
            <Typography variant="h6" className="name">
              {name}
            </Typography>
          }
        />
        <Divider></Divider>
        <CardContent>
            <Typography variant="body1" className="description">
                {description}
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 2 }}>
                {rating}
            </Box>
        </CardContent>
            
      </Card>
    </>
  );
};
