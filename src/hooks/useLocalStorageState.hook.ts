import { useEffect, useState } from 'react';

export const useLocalStorageState = (valueToSave: any, key: string) => {
  const [value, setValue] = useState(valueToSave);

  useEffect(() => {
    const item = localStorage.getItem(key);
    if (!item) {
      return;
    }

    setValue(JSON.parse(item));
  }, []);

  useEffect(() => {
    if (!value) {
      return;
    }
    
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
};
