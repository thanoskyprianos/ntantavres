import { Button, Rating, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { UserCard } from '../components/UserCard.tsx';
import { RatingCard } from '../../components/RatingsCard.tsx';

export const Ratings = () => {
    return (
        <Stack direction={'column'} spacing={2}
        sx={{
            alignItems: 'center',
        }}>
            <Typography variant='h5'>Αξιολογήσεις: Κατερίνα Ζέρβα</Typography>
            <RatingCard
                name="Sample Name"
                description="Poli kali ntanta lorem
                ipsum klp rf34r rifhj23 iopf p2ofj erop2fj34f 4f3opj4fp3 4jf"
                photo="sample-photo-url"
                rating={<Rating value={4} readOnly size='small'/>}
            >
            </RatingCard>
            <RatingCard
                name="Murtw"
                description="mia xara top ntanta"
                photo="sample-photo-url"
                rating={<Rating value={5} readOnly size='small'/>}
            >
            </RatingCard>
        </Stack>
    );
}
