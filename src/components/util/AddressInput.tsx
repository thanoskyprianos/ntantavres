import { Autocomplete, InputLabel, Stack } from '@mui/material';
import { TextFieldSmall } from '@components/util/TextFieldSmall.tsx';
import { Dispatch, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDeviceDetect } from '@hooks/useDeviceDetect.hook.ts';
import { cities } from '@config/i18n.ts';

interface AddressInputProps {
  oldNumber?: number;
  oldAddress?: string;
  oldCity?: string;
  newNumber?: number | string;
  newAddress?: string;
  newCity?: string;
  setExtNumber: Dispatch<number | string>;
  setExtAddress: Dispatch<string>;
  setExtCity: Dispatch<string>;
  isLoading?: boolean;
}

export const AddressInput = ({
  oldNumber,
  oldAddress,
  oldCity,
  newNumber,
  newAddress,
  newCity,
  setExtNumber,
  setExtAddress,
  setExtCity,
  isLoading = false,
}: AddressInputProps) => {
  const { width } = useDeviceDetect();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    // clear city because of wrong translation
    setExtCity('');
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
            placeholder={oldNumber?.toString() || ''}
            sx={{ width: '50%' }}
            slotProps={{ inputLabel: { shrink: !!oldNumber || !!newNumber } }}
            value={newNumber || ''}
            onChange={e => {
              console.log('test');
              const valid = /^\d*$/.test(e.target.value) || !e.target.value;
              if (valid) {
                setExtNumber(e.target.value);
              }
            }}
            onInput={() => console.log('input')}
            disabled={isLoading}
          />
          <TextFieldSmall
            id="address"
            label={t('parent.settings.address')}
            placeholder={oldAddress || ''}
            sx={{ width: '100%' }}
            slotProps={{ inputLabel: { shrink: !!oldAddress || !!newAddress } }}
            value={newAddress}
            onChange={e => setExtAddress(e.target.value)}
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
                t('parent.settings.city') + (oldCity ? ` (${oldCity})` : '')
              }
            />
          )}
          options={cities.get(i18n.language) || []}
          sx={{ width: '100%' }}
          value={newCity}
          onChange={(_e, n) => setExtCity(n || '')}
          disabled={isLoading}
        />
      </Stack>
    </>
  );
};
