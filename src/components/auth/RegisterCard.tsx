import {
  Avatar,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
} from '@mui/material';
import { TextFieldSmall } from '../util/TextFieldSmall.tsx';
import { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';
import { Dispatch, SetStateAction, useState } from 'react';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { isStrongPassword } from 'validator';

interface NamesProps {
  t: TFunction;
  firstName: string;
  setFirstName: Dispatch<string>;
  middleName: string;
  setMiddleName: Dispatch<string>;
  lastName: string;
  setLastName: Dispatch<string>;
}

interface PasswordInputProps {
  t: TFunction;
  password: string;
  setPassword: Dispatch<string>;
  showPassword: boolean;
  setShowPassword: Dispatch<SetStateAction<boolean>>;
  isValidPassword: boolean;
}

interface ConfirmPasswordInputProps {
  t: TFunction;
  password: string;
  confirmPassword: string;
  setConfirmPassword: Dispatch<string>;
  passwordsMatch: boolean;
}

const Names = ({
  t,
  firstName,
  setFirstName,
  middleName,
  setMiddleName,
  lastName,
  setLastName,
}: NamesProps) => {
  return (
    <>
      <TextFieldSmall
        required
        label={t('textField.firstName')}
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
      />
      <TextFieldSmall
        label={t('textField.middleName')}
        value={middleName}
        onChange={e => setMiddleName(e.target.value)}
      />
      <TextFieldSmall
        required
        label={t('textField.lastName')}
        value={lastName}
        onChange={e => setLastName(e.target.value)}
      />
    </>
  );
};

const PasswordInput = ({
  t,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  isValidPassword,
}: PasswordInputProps) => {
  return (
    <TextFieldSmall
      type={showPassword ? 'text' : 'password'}
      label={t('textField.password')}
      required
      value={password}
      onChange={e => setPassword(e.target.value)}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(prev => !prev)}
                edge="end"
              >
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
      error={!isValidPassword && password.length > 0}
    />
    // TODO: change how password is validated
  );
};

const ConfirmPasswordInput = ({
  t,
  password,
  confirmPassword,
  setConfirmPassword,
  passwordsMatch,
}: ConfirmPasswordInputProps) => {
  return (
    <TextFieldSmall
      type="password"
      label={t('textField.confirmPassword')}
      required
      value={confirmPassword}
      onChange={e => setConfirmPassword(e.target.value)}
      error={
        !passwordsMatch && password.length > 0 && confirmPassword.length > 0
      }
      helperText={
        !passwordsMatch && password.length > 0 && confirmPassword.length > 0
          ? t('auth.passwordsNotMatch')
          : ''
      }
    />
  );
};

export const RegisterCard = () => {
  const { t } = useTranslation();

  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const isValidPassword = isStrongPassword(password);
  const passwordsMatch = password === confirmPassword;

  const handleClear = () => {
    setFirstName('');
    setMiddleName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleRegister = () => {
    if (!isValidPassword || !passwordsMatch) {
      return;
    }
  };

  return (
    <Paper
      sx={{
        width: '300px',
        borderRadius: '15px',
      }}
    >
      <Stack
        spacing={2}
        sx={{
          padding: '15px',
          placeItems: 'center',
        }}
      >
        <Avatar src="maria1.jpg" sx={{ height: '100px', width: '100px' }} />
        <Names
          t={t}
          firstName={firstName}
          setFirstName={setFirstName}
          middleName={middleName}
          setMiddleName={setMiddleName}
          lastName={lastName}
          setLastName={setLastName}
        />
        <TextFieldSmall
          type="email"
          label={t('textField.email')}
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <PasswordInput
          t={t}
          password={password}
          setPassword={setPassword}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          isValidPassword={isValidPassword}
        />
        <ConfirmPasswordInput
          t={t}
          password={password}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          passwordsMatch={passwordsMatch}
        />
      </Stack>

      <Stack
        direction="row"
        spacing={2}
        sx={{ padding: '0 15px 15px 15px', justifyContent: 'end' }}
      >
        <Button variant="text" onClick={handleClear}>
          {t('auth.clear')}
        </Button>
        <Button variant="contained" onClick={handleRegister}>
          {t('auth.register')}
        </Button>
      </Stack>
    </Paper>
  );
};
