import { Autocomplete, InputLabel, Stack } from '@mui/material';
import { TextFieldSmall } from '@components/util/TextFieldSmall.tsx';
import { Dispatch, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDeviceDetect } from '@hooks/useDeviceDetect.hook.ts';
import { cities } from '@config/i18n.ts';
import { Location } from '@/types/UserDetails.ts';

interface AddressInputProps {
  newLocation?: Location | null;
  oldLocation?: Location;
  setExtLocation: Dispatch<Location>;
  isLoading?: boolean;
}

export const AddressInput = ({
  oldLocation,
  newLocation,
  setExtLocation,
  isLoading = false,
}: AddressInputProps) => {
  const { width } = useDeviceDetect();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    // clear city because of wrong translation
    setExtLocation({ ...newLocation, city: '' });
  }, [t]);

  return (
    <>
      <InputLabel>{t('parent.info.address')}</InputLabel>
      <Stack
        direction={width < 1000 && width > 852 ? 'column' : 'row'}
        spacing={1}
      >
        <Stack direction="row" sx={{ width: '100%' }} spacing={1}>
          <TextFieldSmall
            id="number"
            label="#"
            placeholder={oldLocation?.number?.toString() || ''}
            sx={{ width: '50%' }}
            slotProps={{
              inputLabel: {
                shrink: !!oldLocation?.number || !!newLocation?.number,
              },
            }}
            value={newLocation?.number || ''}
            onChange={e => {
              const valid = /^\d*$/.test(e.target.value) || !e.target.value;
              if (valid) {
                setExtLocation({
                  ...newLocation,
                  number: Number(e.target.value),
                });
              }
            }}
            disabled={isLoading}
          />
          <TextFieldSmall
            id="address"
            label={t('parent.settings.address')}
            placeholder={oldLocation?.address || ''}
            sx={{ width: '100%' }}
            slotProps={{
              inputLabel: {
                shrink: !!oldLocation?.address || !!newLocation?.address,
              },
            }}
            value={newLocation?.address || ''}
            onChange={e =>
              setExtLocation({ ...newLocation, address: e.target.value })
            }
            disabled={isLoading}
          />
        </Stack>
        <Autocomplete
          id="city"
          size="small"
          renderInput={params => (
            <TextFieldSmall
              {...params}
              label={
                t('parent.settings.city') +
                (oldLocation?.city ? ` (${oldLocation.city})` : '')
              }
            />
          )}
          options={cities.get(i18n.language) || []}
          sx={{ width: '100%' }}
          value={newLocation?.city || ''}
          onChange={(_e, n) =>
            setExtLocation({ ...newLocation, city: n || '' })
          }
          disabled={isLoading}
        />
      </Stack>
    </>
  );
};
