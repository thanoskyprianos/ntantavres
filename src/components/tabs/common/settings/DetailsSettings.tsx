import { Base64String } from '@/types/Avatar.ts';
import { useReducer, useState } from 'react';
import { useProfileContext } from '@/context/ProfileProvider.tsx';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { AvatarInput } from '@components/util/AvatarInput.tsx';
import { TextFieldSmall } from '@components/util/TextFieldSmall.tsx';
import { AddressInput } from '@components/util/AddressInput.tsx';
import { LoadingSpinner } from '@components/LoadingSpinner.tsx';
import { useDeviceDetect } from '@hooks/useDeviceDetect.hook.ts';
import { useTranslation } from 'react-i18next';
import { Location, UserDetails } from '@/types/UserDetails.ts';
import { isEmpty, removeEmptyFields } from '@util/util.ts';
import { useUserDetails } from '@hooks/useUserDetails.hook.ts';
import { useAuthContext } from '@/context/AuthProvider.tsx';
import { useSnackbarContext } from '@/context/SnackbarProvider.tsx';

interface DetailsStateType {
  avatar?: Base64String;
  firstName?: string;
  lastName?: string;
  location?: Location;
  phoneNumber?: string;
}

interface DetailsActionType {
  type: 'update' | 'clear';
  payload?: DetailsStateType;
}

const detailsInitialState: DetailsStateType = {
  avatar: '',
  firstName: '',
  lastName: '',
  location: {} as Location,
  phoneNumber: '',
};

const reducer = (state: DetailsStateType, action: DetailsActionType) => {
  switch (action.type) {
    case 'update':
      return { ...state, ...action.payload };
    case 'clear':
      return detailsInitialState;
  }
};

export const DetailsSettings = () => {
  const { t } = useTranslation();
  const { width } = useDeviceDetect();
  const { avatar, firstName, lastName, location, phoneNumber } =
    useProfileContext();
  const { updateUserDetails, setUserAvatar, isRequesting } = useUserDetails();
  const { user } = useAuthContext();
  const dispatch = useSnackbarContext();

  const [incToClear, setIncToClear] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);
  const [details, detailsDispatch] = useReducer(reducer, detailsInitialState);

  const handleClear = () => {
    detailsDispatch({ type: 'clear' });
    setIncToClear(inc => inc + 1);
  };

  const handleSubmit = async () => {
    if (!user) {
      return;
    }

    const { avatar, ...rest } = details;

    // safely update location
    if (rest.location) {
      rest.location = removeEmptyFields({
        ...location,
        ...removeEmptyFields(rest.location),
      });

      if (
        isEmpty(rest.location) ||
        (rest.location.city === location?.city &&
          rest.location.address === location?.address &&
          rest.location.number === location?.number)
      ) {
        delete rest.location;
      }
    }

    const toUpdate = removeEmptyFields(rest) as unknown as UserDetails;

    setIsUpdating(true);

    try {
      if (toUpdate && !isEmpty(toUpdate)) {
        await updateUserDetails(user, toUpdate);
      }

      if (avatar) {
        await setUserAvatar(user, avatar);
      }

      // kinda messy but ait
      if ((!toUpdate || isEmpty(toUpdate)) && !avatar) {
        return;
      }

      handleClear();
      dispatch!({
        type: 'success',
        payload: {
          message: `${t('parent.settings.success')}. ${t('general.reloading')}`,
        },
      });
      setTimeout(() => window.location.reload(), 2000);
    } catch {
      handleClear();
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Card sx={{ borderRadius: '15px', width: '100%' }}>
      <CardHeader title={t('parent.settings.details')} />
      <CardContent>
        <Stack
          sx={{ width: '100%' }}
          spacing={2}
          divider={<Divider flexItem />}
        >
          <AvatarInput
            t={t}
            setAvatarExt={avatar =>
              detailsDispatch({ type: 'update', payload: { avatar } })
            }
            oldAvatar={avatar}
            incToClear={incToClear}
          >
            {firstName && lastName && (
              <Typography variant="h3">
                {firstName.charAt(0).toUpperCase() +
                  lastName.charAt(0).toUpperCase()}
              </Typography>
            )}
          </AvatarInput>
          <Stack
            direction={width < 1000 && width > 852 ? 'column' : 'row'}
            spacing={1}
          >
            <TextFieldSmall
              label={t('textField.firstName')}
              placeholder={firstName}
              slotProps={{
                inputLabel: { shrink: !!firstName || !!details.firstName },
              }}
              value={details.firstName}
              onChange={e =>
                detailsDispatch({
                  type: 'update',
                  payload: { firstName: e.target.value },
                })
              }
              disabled={isUpdating}
            />
            <TextFieldSmall
              label={t('textField.lastName')}
              placeholder={lastName}
              slotProps={{
                inputLabel: { shrink: !!lastName || !!details.lastName },
              }}
              value={details.lastName}
              onChange={e =>
                detailsDispatch({
                  type: 'update',
                  payload: { lastName: e.target.value },
                })
              }
              disabled={isUpdating}
            />
          </Stack>
          <AddressInput
            oldLocation={location}
            newLocation={details.location}
            setExtLocation={location =>
              detailsDispatch({ type: 'update', payload: { location } })
            }
            isLoading={isUpdating}
          />
          <TextFieldSmall
            label={t('parent.info.phoneNumber')}
            placeholder={phoneNumber}
            slotProps={{
              inputLabel: { shrink: !!phoneNumber || !!details.phoneNumber },
            }}
            value={details.phoneNumber}
            onChange={e =>
              detailsDispatch({
                type: 'update',
                payload: { phoneNumber: e.target.value },
              })
            }
            disabled={isUpdating}
          />
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
            <Button
              variant="text"
              onClick={handleClear}
              disabled={isRequesting || isUpdating}
            >
              {t('auth.clear')}
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              type="submit"
              disabled={isRequesting || isUpdating}
            >
              {t('general.update')}
            </Button>
          </Stack>
        </Stack>
      </CardActions>
    </Card>
  );
};
