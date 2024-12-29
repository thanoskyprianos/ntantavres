import {
  Button,
  ClickAwayListener,
  Dialog,
  DialogActions,
  DialogTitle,
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
import { ClearIcon, DatePicker } from '@mui/x-date-pickers';
import { useLocation, useNavigate } from 'react-router-dom';
import { LoadingSpinner } from '../LoadingSpinner.tsx';
import InfoIcon from '@mui/icons-material/Info';
import {
  ageValidation,
  emailValidation,
  passwordValidation,
} from '@util/authValidation.util.ts';
import { AvatarInput } from '@components/util/AvatarInput.tsx';
import { useAuthContext } from '@/context/AuthProvider.tsx';
import { useSnackbarContext } from '@/context/SnackbarProvider.tsx';
import { useUserDetails } from '@hooks/useUserDetails.hook.ts';
import { UserDetails } from '@/types/UserDetails.ts';

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

interface BabysitterDocumentsProps {
  t: TFunction;
  isDialogOpen: boolean;
  setIsDialogOpen: Dispatch<boolean>;
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

const BabysitterDocuments = ({
  t,
  isDialogOpen,
  setIsDialogOpen,
}: BabysitterDocumentsProps) => {
  const handleOnSubmit = () => {
    setIsDialogOpen(false);
  };

  return (
    <Dialog
      open={isDialogOpen}
      onClose={() => setIsDialogOpen(false)}
      maxWidth="xs"
      fullWidth={true}
    >
      <DialogTitle>
        <Stack
          direction="row"
          sx={{ alignItems: 'center', justifyContent: 'space-between' }}
        >
          {t('auth.babysitterDialog.title')}
          <IconButton edge="end" onClick={() => setIsDialogOpen(false)}>
            <ClearIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogActions>
        <Button variant="text" sx={{ color: 'primary.light' }}>
          {t('auth.clear')}
        </Button>
        <Button variant="contained" onClick={handleOnSubmit}>
          {t('auth.babysitterDialog.submit')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const RegisterCard = () => {
  const { t } = useTranslation();
  const { onRegister, isLoading } = useAuthContext();
  const dispatch = useSnackbarContext();
  const { registerUser } = useUserDetails();
  const navigate = useNavigate();
  const location = useLocation();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthdate, setBirthdate] = useState<Date | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [avatar, setAvatar] = useState('');
  // const [optBabysitter, setOptBabysitter] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

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

  // const handleActiveCheckbox = () => {
  //   setDialogOpen(true);
  // };

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

    if (!ageValidation(birthdate)) {
      return;
    }

    try {
      setIsRegistering(true);
      const user = await onRegister({ email, password });

      if (!user) {
        throw new Error(t('auth.registerError'));
      }

      try {
        const details: UserDetails = {
          uid: user.uid,
          firstName,
          lastName,
          email,
          role: 'PARENT',
          birthdate,
        };

        await registerUser(user, details, avatar);
      } catch (err) {
        // TODO: snackbar
        console.error(err);
      } finally {
        setIsRegistering(false);
      }

      dispatch!({
        type: 'success',
        payload: { message: t('auth.successfulRegister') },
      });

      // TODO: display user details on profile
      navigate(location?.state?.from || `/profile/${user.uid}`);
    } catch (err) {
      if (!(err instanceof Error)) {
        throw err;
      }

      dispatch!({
        type: 'error',
        payload: { message: err.message },
      });

      setEmail('');
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
        <AvatarInput t={t} setAvatarExt={setAvatar}>
          {firstName && lastName && (
            <Typography variant="h3">
              {firstName.charAt(0).toUpperCase() +
                lastName.charAt(0).toUpperCase()}
            </Typography>
          )}
        </AvatarInput>

        <Stack direction="row" spacing={1}>
          <Names
            t={t}
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            disabled={isLoading || isRegistering}
          />
        </Stack>
        <DatePicker
          disableFuture
          label={t('textField.birthdate')}
          value={birthdate}
          onChange={e => setBirthdate(e)}
          sx={{ width: '100%' }}
          slotProps={{
            textField: {
              size: 'small',
              required: true,
              error: birthdate != null && !ageValidation(birthdate),
              helperText:
                birthdate != null && !ageValidation(birthdate)
                  ? t('auth.birthdate')
                  : '',
            },
            actionBar: {
              actions: ['clear', 'accept'],
              sx: { button: { color: 'secondary.contrastText' } },
            },
          }}
          disabled={isLoading || isRegistering}
        />
        <TextFieldSmall
          type="email"
          label={t('textField.email')}
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          disabled={isLoading || isRegistering}
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
          disabled={isLoading || isRegistering}
          passwordValidation={passwordValidationList}
        />
        <ConfirmPasswordInput
          t={t}
          password={password}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          passwordsMatch={passwordsMatch}
          disabled={isLoading || isRegistering}
        />
        {/*<FormControlLabel*/}
        {/*  control={*/}
        {/*    <Checkbox*/}
        {/*      edge={'start'}*/}
        {/*      onClick={handleActiveCheckbox}*/}
        {/*      checked={optBabysitter}*/}
        {/*      color="success"*/}
        {/*      size="small"*/}
        {/*    />*/}
        {/*  }*/}
        {/*  label={t('auth.isBabysitter')}*/}
        {/*  sx={{ alignSelf: 'start' }}*/}
        {/*/>*/}
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
        {isRegistering ? (
          <LoadingSpinner size="25px" sx={{ paddingLeft: '30px' }} />
        ) : (
          // dummy div to make space-between work
          <div></div>
        )}
        <Stack direction="row" spacing={2}>
          <Button
            variant="text"
            onClick={handleClear}
            disabled={isLoading || isRegistering}
          >
            {t('auth.clear')}
          </Button>
          <Button
            variant="contained"
            onClick={handleRegister}
            type="submit"
            disabled={isLoading || isRegistering}
          >
            {t('auth.register')}
          </Button>
        </Stack>
      </Stack>
      <BabysitterDocuments
        t={t}
        isDialogOpen={dialogOpen}
        setIsDialogOpen={setDialogOpen}
      />
    </Paper>
  );
};
