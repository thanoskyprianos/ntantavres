import { Button, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const QuestionsPage = () => {
  return (
    <div>
      <Stack
        direction="column"
        spacing={2}
        sx={{
          justifyContent: "flex-start",
          alignItems: "center",
          marginLeft: "10px"
        }}
      >
        <Typography
          variant='h3'
        >Συχνές ερωτήσεις από..</Typography>
        <Button component={Link} to="/questions/parents" className="button"
          sx={{
            width: '350px',
            fontSize: '20px',
            border: '2px solid',
          }}
        >
          ΓΟΝΕΙΣ/ΚΗΔΕΜΟΝΕΣ
        </Button>
        <Button component={Link} to="/questions/babysitters" className="button"
          sx={{ 
            width: "350px", 
            fontSize: "20px",
            border: "2px solid",
          }}
        >
          ΕΠΑΓΓΕΛΜΑΤΙΕΣ/ΝΤΑΝΤΑΔΕΣ
        </Button>
      </Stack>
    </div>
  );
};
