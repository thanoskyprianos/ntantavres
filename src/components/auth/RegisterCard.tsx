import {
  Avatar,
  Button,
  ClickAwayListener,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { TextFieldSmall } from '../util/TextFieldSmall.tsx';
import { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';
import { Dispatch, SetStateAction, useState } from 'react';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { DatePicker } from '@mui/x-date-pickers';
import { useAuth } from '../../hooks/useAuth.hook.ts';
import { useNavigate } from 'react-router-dom';
import { LoadingSpinner } from '../LoadingSpinner.tsx';
import InfoIcon from '@mui/icons-material/Info';
import {
  emailValidation,
  passwordValidation,
} from '../../util/authValidation.util.ts';

interface NamesProps {
  t: TFunction;
  firstName: string;
  setFirstName: Dispatch<string>;
  lastName: string;
  setLastName: Dispatch<string>;
  disabled?: boolean;
}

interface PasswordTooltipListProps {
  t: TFunction;
  passwordValidation: Map<string, boolean>;
}

interface PasswordInputProps {
  t: TFunction;
  password: string;
  setPassword: Dispatch<string>;
  showPassword: boolean;
  setShowPassword: Dispatch<SetStateAction<boolean>>;
  disabled?: boolean;
  passwordValidation: Map<string, boolean>;
}

interface ConfirmPasswordInputProps {
  t: TFunction;
  password: string;
  confirmPassword: string;
  setConfirmPassword: Dispatch<string>;
  passwordsMatch: boolean;
  disabled?: boolean;
}

const Names = ({
  t,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  disabled = false,
}: NamesProps) => {
  return (
    <>
      <TextFieldSmall
        required
        label={t('textField.firstName')}
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
        disabled={disabled}
      />
      <TextFieldSmall
        required
        label={t('textField.lastName')}
        value={lastName}
        onChange={e => setLastName(e.target.value)}
        disabled={disabled}
      />
    </>
  );
};

const PasswordTooltipList = ({
  t,
  passwordValidation,
}: PasswordTooltipListProps) => {
  return (
    <List>
      {Object.entries(t('tooltip.password', { returnObjects: true })).map(
        ([name, value]) => (
          <ListItem key={name} style={{ color: 'error.main' }}>
            <Typography
              variant="subtitle2"
              sx={{
                textDecoration: passwordValidation.get(name)
                  ? 'line-through'
                  : 'none',
              }}
            >
              {value}
            </Typography>
          </ListItem>
        )
      )}
    </List>
  );
};

const PasswordInput = ({
  t,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  disabled = false,
  passwordValidation,
}: PasswordInputProps) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  return (
    <Stack direction="row" sx={{ placeItems: 'center', width: '100%' }}>
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
        error={
          Array.from(passwordValidation.values()).includes(false) &&
          password.length > 0
        }
        disabled={disabled}
      />
      <ClickAwayListener onClickAway={() => setTooltipOpen(false)}>
        <Tooltip
          title={
            <PasswordTooltipList
              t={t}
              passwordValidation={passwordValidation}
            />
          }
          open={tooltipOpen}
          arrow
          placement="left"
          slotProps={{
            popper: {
              modifiers: [
                {
                  name: 'offset',
                  options: {
                    offset: [0, -15],
                  },
                },
              ],
            },
          }}
        >
          <IconButton
            onClick={() => setTooltipOpen(tooltip => !tooltip)}
            edge="end"
          >
            <InfoIcon
              sx={{
                color:
                  Array.from(passwordValidation.values()).includes(false) &&
                  password.length > 0
                    ? 'error.main'
                    : '',
              }}
            />
          </IconButton>
        </Tooltip>
      </ClickAwayListener>
    </Stack>
    // TODO: change how password is validated
  );
};

const ConfirmPasswordInput = ({
  t,
  password,
  confirmPassword,
  setConfirmPassword,
  passwordsMatch,
  disabled = false,
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
      disabled={disabled}
    />
  );
};

export const RegisterCard = () => {
  const { t } = useTranslation();
  const { onRegister, isLoading } = useAuth();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthdate, setBirthdate] = useState<Date | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const isValidEmail = emailValidation(email);

  const passwordsMatch = password === confirmPassword;
  const passwordValidationList = passwordValidation(password);

  const handleClear = () => {
    setFirstName('');
    setLastName('');
    setBirthdate(null);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleRegister = async () => {
    if (
      !passwordsMatch ||
      Array.from(passwordValidationList.values()).includes(false)
    ) {
      return;
    }

    if (
      !firstName ||
      !lastName ||
      !birthdate ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      return;
    }

    try {
      await onRegister({ email, password });
      // TODO:
      //  * upload user details on firestore
      //  * show success on snackbar
      navigate('/parent/profile');
    } catch (err) {
      // TODO: show error on snackbar
      console.log(err);
    }
  };

  return (
    <Paper
      sx={{
        width: '300px',
        borderRadius: '15px',
      }}
      component="form"
      onSubmit={e => e.preventDefault()}
    >
      <Stack
        spacing={2}
        sx={{
          padding: '15px',
          placeItems: 'center',
        }}
      >
        <Avatar src="maria1.jpg" sx={{ height: '100px', width: '100px' }} />
        <Stack direction="row" spacing={1}>
          <Names
            t={t}
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            disabled={isLoading}
          />
        </Stack>
        <DatePicker
          disableFuture
          label={t('textField.birthdate')}
          value={birthdate}
          onChange={e => setBirthdate(e)}
          sx={{ width: '100%' }}
          slotProps={{
            textField: { size: 'small', required: true },
            actionBar: {
              actions: ['clear', 'accept'],
              sx: { button: { color: 'secondary.contrastText' } },
            },
          }}
          disabled={isLoading}
        />
        <TextFieldSmall
          type="email"
          label={t('textField.email')}
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          disabled={isLoading}
          error={email.length > 0 && !isValidEmail}
          helperText={
            email.length > 0 && !isValidEmail ? t('auth.invalidEmail') : ''
          }
        />
        <PasswordInput
          t={t}
          password={password}
          setPassword={setPassword}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          disabled={isLoading}
          passwordValidation={passwordValidationList}
        />
        <ConfirmPasswordInput
          t={t}
          password={password}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          passwordsMatch={passwordsMatch}
          disabled={isLoading}
        />
      </Stack>

      <Stack
        direction="row"
        spacing={2}
        sx={{
          padding: '0 15px 15px 15px',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {isLoading ? (
          <LoadingSpinner size="25px" sx={{ paddingLeft: '30px' }} />
        ) : (
          // dummy div to make space-between work
          <div></div>
        )}
        <Stack direction="row" spacing={2}>
          <Button variant="text" onClick={handleClear} disabled={isLoading}>
            {t('auth.clear')}
          </Button>
          <Button
            variant="contained"
            onClick={handleRegister}
            type="submit"
            disabled={isLoading}
          >
            {t('auth.register')}
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};
