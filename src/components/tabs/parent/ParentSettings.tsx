import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Stack,
} from '@mui/material';
import { TFunction } from 'i18next';
import { TextFieldSmall } from '@components/util/TextFieldSmall.tsx';
import { UserDetails } from '@/types/UserDetails.ts';
import { useDeviceDetect } from '@hooks/useDeviceDetect.hook.ts';
import { AddressInput } from '@components/util/AddressInput.tsx';
import { Dispatch, useState } from 'react';
import { useUserDetails } from '@hooks/useUserDetails.hook.ts';
import { useAuthContext } from '@/context/AuthProvider.tsx';
import { removeEmptyFields } from '@components/util/util.ts';
import { LoadingSpinner } from '@components/LoadingSpinner.tsx';
import { useSnackbarContext } from '@/context/SnackbarProvider.tsx';

interface ParentSettingsProps extends UserDetails {
  t: TFunction;
}

interface DetailsSettingsProps extends UserDetails {
  t: TFunction;
  newFirstName: string;
  setNewFirstName: Dispatch<string>;
  newLastName: string;
  setNewLastName: Dispatch<string>;
  newNumber: number | string;
  setNewNumber: Dispatch<number | string>;
  newAddress: string;
  setNewAddress: Dispatch<string>;
  newCity: string;
  setNewCity: Dispatch<string>;
  isUpdating: boolean;
}

interface AuthSettingsProps extends UserDetails {
  t: TFunction;
}

const DetailsSettings = (props: DetailsSettingsProps) => {
  const {
    t,
    firstName,
    lastName,
    number,
    address,
    city,
    newFirstName,
    setNewFirstName,
    newLastName,
    setNewLastName,
    newNumber,
    setNewNumber,
    newAddress,
    setNewAddress,
    newCity,
    setNewCity,
    isUpdating,
  } = props;

  const { width } = useDeviceDetect();

  return (
    <>
      <Stack sx={{ width: '100%' }} spacing={1}>
        <Stack
          direction={width < 1000 && width > 852 ? 'column' : 'row'}
          spacing={1}
        >
          <TextFieldSmall
            label={t('textField.firstName')}
            placeholder={firstName}
            slotProps={{ inputLabel: { shrink: true } }}
            value={newFirstName}
            onChange={e => setNewFirstName(e.target.value)}
            disabled={isUpdating}
          />
          <TextFieldSmall
            label={t('textField.lastName')}
            placeholder={lastName}
            slotProps={{ inputLabel: { shrink: true } }}
            value={newLastName}
            onChange={e => setNewLastName(e.target.value)}
            disabled={isUpdating}
          />
        </Stack>
        <AddressInput
          oldNumber={Number(number)}
          oldAddress={address}
          oldCity={city}
          newNumber={newNumber}
          newAddress={newAddress}
          newCity={newCity}
          setExtNumber={setNewNumber}
          setExtAddress={setNewAddress}
          setExtCity={setNewCity}
          isLoading={isUpdating}
        />
      </Stack>
    </>
  );
};

const AuthSettings = (props: AuthSettingsProps) => {
  const { t, email } = props;
  const { width } = useDeviceDetect();

  return (
    <Stack spacing={1} sx={{ width: '100%' }}>
      <TextFieldSmall
        label={t('textField.email')}
        placeholder={email}
        slotProps={{ inputLabel: { shrink: true } }}
      />
      <Stack
        direction={width < 1000 && width > 852 ? 'column' : 'row'}
        spacing={1}
      >
        <TextFieldSmall label={t('textField.password')} />
        <TextFieldSmall label={t('textField.confirmPassword')} />
      </Stack>
    </Stack>
  );
};

export const ParentSettings = (props: ParentSettingsProps) => {
  const { t } = props;
  const { device } = useDeviceDetect();
  const { user } = useAuthContext();
  const { updateUserDetails, isRequesting } = useUserDetails();
  const dispatch = useSnackbarContext();

  const [isUpdatingDetails, setIsUpdatingDetails] = useState(false);

  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [newNumber, setNewNumber] = useState<number | string>('');
  const [newAddress, setNewAddress] = useState('');
  const [newCity, setNewCity] = useState('');

  const handleDetailsClear = () => {
    setNewFirstName('');
    setNewLastName('');
    setNewNumber(0);
    setNewAddress('');
    setNewCity('');
  };

  const handleDetailsSubmit = async () => {
    if (!user) {
      return;
    }

    const updatedDetails = removeEmptyFields({
      firstName: newFirstName,
      lastName: newLastName,
      number: newNumber,
      address: newAddress,
      city: newCity,
    }) as unknown as UserDetails;

    console.log(updatedDetails);

    if (!updatedDetails || Object.keys(updatedDetails).length === 0) {
      return;
    }

    setIsUpdatingDetails(true);

    try {
      await updateUserDetails(user, updatedDetails);
    } catch {
      handleDetailsClear();
    } finally {
      setIsUpdatingDetails(false);
      handleDetailsClear();
      dispatch!({
        type: 'success',
        payload: {
          message: `${t('parent.settings.success')}. ${t('general.reloading')}`,
        },
      });
      setTimeout(() => window.location.reload(), 2000);
    }
  };

  return (
    <Stack spacing={1} sx={{ width: '100%' }}>
      <Card sx={{ borderRadius: '15px' }}>
        <CardHeader
          title={t('parent.actions.settings')}
          subheader={t('parent.settings.info')}
        />
      </Card>
      <Stack
        direction={device === 'desktop' ? 'row' : 'column'}
        spacing={1}
        sx={{ alignItems: 'start' }}
      >
        <Card sx={{ borderRadius: '15px', width: '100%' }}>
          <CardHeader title={t('parent.settings.details')} />
          <CardContent>
            <DetailsSettings
              newFirstName={newFirstName}
              setNewFirstName={setNewFirstName}
              newLastName={newLastName}
              setNewLastName={setNewLastName}
              newNumber={newNumber}
              setNewNumber={setNewNumber}
              newAddress={newAddress}
              setNewAddress={setNewAddress}
              newCity={newCity}
              setNewCity={setNewCity}
              isUpdating={isUpdatingDetails}
              {...props}
            />
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
              {isUpdatingDetails ? (
                <LoadingSpinner size="25px" sx={{ paddingLeft: '30px' }} />
              ) : (
                // dummy div to make space-between work
                <div></div>
              )}
              <Stack direction="row" spacing={2}>
                <Button
                  variant="text"
                  onClick={handleDetailsClear}
                  disabled={isRequesting || isUpdatingDetails}
                >
                  {t('auth.clear')}
                </Button>
                <Button
                  variant="contained"
                  onClick={handleDetailsSubmit}
                  type="submit"
                  disabled={isRequesting || isUpdatingDetails}
                >
                  {t('auth.babysitterDialog.submit')}
                </Button>
              </Stack>
            </Stack>
          </CardActions>
        </Card>
        <Card sx={{ borderRadius: '15px', width: '100%' }}>
          <CardHeader title={t('parent.settings.auth')} />
          <CardContent>
            <AuthSettings {...props} />
          </CardContent>
        </Card>
      </Stack>
    </Stack>
  );
};
