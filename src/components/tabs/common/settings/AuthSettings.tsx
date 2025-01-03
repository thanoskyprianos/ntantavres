import {
  emailValidation,
  passwordValidation,
} from '@util/authValidation.util.ts';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Stack,
} from '@mui/material';
import { LoadingSpinner } from '@components/LoadingSpinner.tsx';
import { TextFieldSmall } from '@components/util/TextFieldSmall.tsx';
import {
  ConfirmPasswordInput,
  PasswordInput,
} from '@components/auth/RegisterCard.tsx';
import { useProfileContext } from '@/context/ProfileProvider.tsx';
import { useTranslation } from 'react-i18next';
import { useReducer, useState } from 'react';
import { useAuthContext } from '@/context/AuthProvider.tsx';
import { useSnackbarContext } from '@/context/SnackbarProvider.tsx';

interface AuthStateType {
  email?: string;
  password?: string;
  confirmPassword?: string;
  showPassword?: boolean;
}

const authInitialState: AuthStateType = {
  email: '',
  password: '',
  confirmPassword: '',
  showPassword: false,
};

interface AuthActionType {
  type: 'update' | 'hide' | 'clear';
  payload?: AuthStateType;
}

const reducer = (state: AuthStateType, action: AuthActionType) => {
  switch (action.type) {
    case 'update':
      return { ...state, ...action.payload };
    case 'hide':
      return { ...state, showPassword: !state.showPassword };
    case 'clear':
      return authInitialState;
  }
};

export const AuthSettings = () => {
  const { t } = useTranslation();
  const { updateEmail, updatePassword, onLogOut } = useAuthContext();
  const { email } = useProfileContext();
  const dispatch = useSnackbarContext();

  const [isUpdating, setIsUpdating] = useState(false);
  const [auth, authDispatch] = useReducer(reducer, authInitialState);

  const isValidEmail = emailValidation(auth.email || '');
  const passwordValidationList = passwordValidation(auth?.password || '');
  const passwordsMatch = auth.password === auth.confirmPassword;

  const handleClear = () => {
    authDispatch({ type: 'clear' });
  };

  const handleSubmit = async () => {
    if (!auth.email && !auth.password) {
      return;
    }

    setIsUpdating(true);
    try {
      if (auth.email && isValidEmail) {
        await updateEmail(auth.email);

        dispatch!({
          type: 'success',
          payload: {
            message: `${t('parent.settings.success')}. ${t('general.reloading')}`,
          },
        });

        setTimeout(() => window.location.reload(), 2000);
      }

      if (
        auth.password &&
        auth.confirmPassword &&
        passwordsMatch &&
        !Array.from(passwordValidationList.values()).includes(false)
      ) {
        await updatePassword(auth.password);

        dispatch!({
          type: 'success',
          payload: {
            message: `${t('parent.settings.success')}. ${t('general.reloading')}`,
          },
        });

        setTimeout(() => window.location.reload(), 2000);
      }

      handleClear();
    } catch (err) {
      handleClear();

      if (!(err instanceof Error)) {
        throw new Error();
      }

      if (err.message === 'Update email') {
        dispatch!({
          type: 'error',
          payload: { message: t('error.updateEmail') },
        });
      } else if (err.message === 'Update password') {
        dispatch!({
          type: 'error',
          payload: { message: t('error.updatePassword') },
        });
      } else if (err.message === 'Login again') {
        dispatch!({
          type: 'error',
          payload: { message: t('error.loginAgain') },
        });

        setTimeout(() => onLogOut(), 2000);
      } else if (err.message === 'Invalid email') {
        dispatch!({
          type: 'error',
          payload: { message: t('error.emailExists', { email: auth.email }) },
        });
      }
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Card sx={{ borderRadius: '15px', width: '100%' }}>
      <CardHeader title={t('parent.settings.auth')} />
      <CardContent>
        <Stack
          spacing={2}
          sx={{ width: '100%' }}
          divider={<Divider flexItem />}
        >
          <TextFieldSmall
            type="email"
            label={t('textField.email')}
            placeholder={email}
            value={auth.email}
            slotProps={{ inputLabel: { shrink: !!email || !!auth.email } }}
            onChange={e =>
              authDispatch({
                type: 'update',
                payload: { email: e.target.value },
              })
            }
            error={!!auth.email && auth.email.length > 0 && !isValidEmail}
            helperText={
              !!auth.email && auth.email.length > 0 && !isValidEmail
                ? t('auth.invalidEmail')
                : ''
            }
            disabled={isUpdating}
          />
          <Stack spacing={1}>
            <PasswordInput
              t={t}
              password={auth.password || ''}
              setPassword={p =>
                authDispatch({ type: 'update', payload: { password: p } })
              }
              showPassword={auth.showPassword || false}
              setShowPassword={() => authDispatch({ type: 'hide' })}
              passwordValidation={passwordValidationList}
              required={false}
              disabled={isUpdating}
            />
            <ConfirmPasswordInput
              t={t}
              password={auth.password || ''}
              confirmPassword={auth.confirmPassword || ''}
              setConfirmPassword={p =>
                authDispatch({
                  type: 'update',
                  payload: { confirmPassword: p },
                })
              }
              passwordsMatch={passwordsMatch}
              required={false}
              disabled={!auth.password || isUpdating}
            />
          </Stack>
        </Stack>
      </CardContent>
      <CardActions>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            padding: '0 15px 15px 15px',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          {isUpdating ? (
            <LoadingSpinner size="25px" sx={{ paddingLeft: '30px' }} />
          ) : (
            // dummy div to make space-between work
            <div></div>
          )}
          <Stack direction="row" spacing={2}>
            <Button variant="text" onClick={handleClear} disabled={isUpdating}>
              {t('auth.clear')}
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              type="submit"
              disabled={isUpdating}
            >
              {t('general.update')}
            </Button>
          </Stack>
        </Stack>
      </CardActions>
    </Card>
  );
};
