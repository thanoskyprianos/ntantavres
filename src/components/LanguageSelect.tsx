import { useTranslation } from 'react-i18next';
import {
  FormControl,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { langs } from '../config/i18n.ts';
import HomeIcon from '@mui/icons-material/Home';

export const LanguageSelect = () => {
  const { t, i18n } = useTranslation();

  return (
    <FormControl sx={{ padding: 0 }}>
      <Select
        variant="outlined"
        sx={{
          borderRadius: '15px',
        }}
        onChange={e => i18n.changeLanguage(e.target.value)}
        displayEmpty
        renderValue={(value: string) => {
          return (
            <Stack sx={{ margin: 0, alignItems: 'center' }}>
              <HomeIcon />
              <Typography sx={{ padding: 0, margin: 0 }}>{value}</Typography>
            </Stack>
          );
        }}
      >
        {langs.map(lang => (
          <MenuItem value={lang} key={lang} sx={{ margin: 0 }}>
            {t(`language.${lang}`).slice(0, 2)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
