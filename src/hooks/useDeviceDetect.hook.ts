import { useEffect, useState } from 'react';

export type DeviceUsed = 'desktop' | 'tablet' | 'mobile';

export const useDeviceDetect = () => {
  const [device, setDevice] = useState<DeviceUsed>('desktop');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 638) {
        setDevice('mobile');
      } else if (window.innerWidth <= 852) {
        setDevice('tablet');
      } else {
        setDevice('desktop');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { device };
};
