import { useEffect, useState } from 'react';

export type DeviceUsed = 'desktop' | 'tablet' | 'mobile';

export const useDeviceDetect = () => {
  const [device, setDevice] = useState<DeviceUsed>('desktop');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 420) {
        setDevice('mobile');
      } else if (window.innerWidth <= 770) {
        setDevice('tablet');
      } else {
        setDevice('desktop');
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { device };
};
