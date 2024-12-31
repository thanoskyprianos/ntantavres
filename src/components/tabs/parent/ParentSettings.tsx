import { Card, CardContent, CardHeader, Divider, Stack } from '@mui/material';
import { TFunction } from 'i18next';
import { TextFieldSmall } from '@components/util/TextFieldSmall.tsx';

interface ParentSettingsProps {
  t: TFunction;
}

interface DetailsSettingsProps {
  t: TFunction;
}

interface AuthSettingsProps {
  t: TFunction;
}

const DetailsSettings = ({ t }: DetailsSettingsProps) => {
  return (
    <Stack direction="row">
      <TextFieldSmall label={t('textField.firstName')} />
      <TextFieldSmall label={t('textField.lastName')} />
    </Stack>
  );
};

const AuthSettings = ({ t }: AuthSettingsProps) => {
  return (
    <Stack direction="row">
      <TextFieldSmall label={t('textField.email')} />
      <TextFieldSmall label={t('textField.password')} />
      <TextFieldSmall label={t('textField.confirmPassword')} />
    </Stack>
  );
};

export const ParentSettings = ({ t }: ParentSettingsProps) => {
  return (
    <Card sx={{ borderRadius: '15px' }}>
      <CardHeader title={t('parent.actions.settings')} />
      <CardContent>
        <Stack divider={<Divider flexItem />} spacing={1}>
          <DetailsSettings t={t} />
          <AuthSettings t={t} />
        </Stack>
      </CardContent>
    </Card>
  );
};
