import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const QuestionsPage = () => {
    const [activeBox, setActiveBox] = useState('box1');
    const { t } = useTranslation();

    return (
        <div>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 4 }}>
            <Button
              variant="contained"
              onClick={() => setActiveBox('box1')}
              sx={{
                fontSize: '20px',
                marginRight: 2,
                backgroundColor: activeBox === 'box1' ? '#aeb5ff' : '#3a3a3a',
                color: activeBox === 'box1' ? 'white' : 'default',
                border: activeBox === 'box1' ? '2px solid #5361ff' : '2px solid transparent',
              }}
            >
              ΓΟΝΕΙΣ
            </Button>
            <Button
              variant="contained"
              onClick={() => setActiveBox('box2')}
              sx={{
                fontSize: '20px',
                backgroundColor: activeBox === 'box2' ? '#aeb5ff' : '#3a3a3a',
                color: activeBox === 'box2' ? 'white' : 'default',
                border: activeBox === 'box2' ? '2px solid #5361ff' : '2px solid transparent',
              }}
            >
                ΕΠΑΓΓΕΛΜΑΤΙΕΣ
            </Button>
          </Box>
            {activeBox === 'box1' && (
                <Box
                    sx={{
                        padding: '30px',
                        backgroundColor: 'background.paper',
                        border: '1px solid grey',
                        borderRadius: '8px',
                        boxShadow: 3,
                        marginLeft: '40px',
                        marginRight: '40px',
                        mt: 4,
                    }}
                >
                <Typography variant='h4'>
                    {t('questions.title')}
                </Typography>
                <Typography variant='h5'>
                    {t('questions.onea')}
                </Typography>
                <Typography variant='h6' color='text.secondary'>
                    {t('questions.oneb')}
                </Typography>
                <Typography variant='h5'>
                    {t('questions.twoa')}
                </Typography>
                <Typography variant='h6' color='text.secondary'>
                    {t('questions.twob')}
                </Typography>
                <Typography variant='h5'>
                    {t('questions.threea')}
                </Typography>
                <Typography variant='h6' color='text.secondary'>
                    {t('questions.threeb')}
                </Typography>
                <Typography variant='h5'>
                    {t('questions.foura')}
                </Typography>
                <Typography variant='h6' color='text.secondary'>
                    {t('questions.fourb')}
                </Typography>
                </Box>
            )}
            {activeBox === 'box2' && (
                <Box
                    sx={{
                        padding: '30px',
                        backgroundColor: 'background.paper',
                        border: '1px solid grey',
                        borderRadius: '8px',
                        boxShadow: 3,
                        marginLeft: '40px',
                        marginRight: '40px',
                        mt: 4,
                    }}
                >
                    <Typography variant='h4'>
                        {t('questionsb.title')}
                    </Typography>
                    <Typography variant='h5'>
                        {t('questionsb.onea')}
                    </Typography>
                    <Typography variant='h6' color='text.secondary'>
                        {t('questionsb.oneb')}
                    </Typography>
                    <Typography variant='h5'>
                        {t('questionsb.twoa')}
                    </Typography>
                    <Typography variant='h6' color='text.secondary'>
                        {t('questionsb.twob')}
                    </Typography>
                    <Typography variant='h5'>
                        {t('questionsb.threea')}
                    </Typography>
                    <Typography variant='h6' color='text.secondary'>
                        {t('questionsb.threeb')}
                    </Typography>
                    <Typography variant='h5'>
                        {t('questionsb.foura')}
                    </Typography>
                    <Typography variant='h6' color='text.secondary'>
                        {t('questionsb.fourb')}
                    </Typography>
                </Box>
            )}
        </div>
    );
};

export default QuestionsPage;