import { useTranslation } from 'react-i18next';
import {
  FormControl,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { langs } from '../config/i18n.ts';
import LanguageIcon from '@mui/icons-material/Language';

export const LanguageSelect = () => {
  const { t, i18n } = useTranslation(['translation', 'languages']);

  return (
    <FormControl
      sx={{
        '&& .Mui-selected': {
          backgroundColor: 'primary.dark',
        },
      }}
    >
      <Select
        variant="filled"
        sx={{
          borderRadius: '15px',
          color: 'primary.contrastText', // for some reason not set by theme
          backgroundColor: 'primary.main',
          '.MuiSvgIcon-root': {
            color: 'inherit',
          },
          '&:hover': {
            backgroundColor: 'primary.dark',
          },
        }}
        hiddenLabel
        value={i18n.resolvedLanguage}
        onChange={e => i18n.changeLanguage(e.target.value)}
        renderValue={(value: string) => {
          return (
            <Stack direction="row">
              <LanguageIcon sx={{ paddingRight: '5px' }} />
              <Typography>{value.substring(3)}</Typography>
            </Stack>
          );
        }}
      >
        {langs.map(lang => (
          <MenuItem value={lang} key={lang}>
            {t(`languages:language.${lang}`)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
