import { NavTab, TabNav } from '@components/tabs/TabNav.tsx';
import { Paper, tabsClasses, useTheme } from '@mui/material';
import React, { useEffect } from 'react';
import { useDeviceDetect } from '@hooks/useDeviceDetect.hook.ts';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

interface ProfileNavProps {
  tabs?: NavTab[];
  selectedTab: number;
  handleSelectedTab: (e: React.SyntheticEvent, n: number) => void;
}

export const ProfileNav = ({
  tabs,
  selectedTab,
  handleSelectedTab,
}: ProfileNavProps) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { device } = useDeviceDetect();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (!tab) {
      return;
    }

    navigate(location.pathname + location.search);
  }, [searchParams]);

  return (
    <Paper sx={{ borderRadius: '15px' }}>
      <TabNav
        tabProps={{
          iconPosition: 'start',
          sx: {
            justifyContent: 'start',
            minHeight: '50px',
            height: '50px',
            '&.Mui-selected': {
              color: isDarkMode ? '#9acffa' : '#1976d2',
            },
            textWrap: 'nowrap',
          },
        }}
        tabsProps={{
          orientation: device === 'desktop' ? 'vertical' : 'horizontal',
          value: selectedTab,
          onChange: handleSelectedTab,
          variant: 'scrollable',
          allowScrollButtonsMobile: true,
          sx: {
            borderRadius: '15px',
            [`& .${tabsClasses.scrollButtons}`]: {
              '&.Mui-disabled': { opacity: 0.3 },
            },
          },
          TabIndicatorProps: {
            sx: {
              display: 'flex',
              justifyContent: 'center',
              alignItems: device === 'desktop' ? 'center' : 'initial',
              background: 'transparent',
            },
            children:
              device === 'desktop' ? (
                <span
                  style={{
                    height: '65%',
                    maxWidth: '5px',
                    width: '5px',
                    backgroundColor: isDarkMode ? '#9acffa' : '#1976d2',
                  }}
                />
              ) : (
                <span
                  style={{
                    width: '75%',
                    backgroundColor: isDarkMode ? '#9acffa' : '#1976d2',
                  }}
                />
              ),
          },
        }}
        tabs={tabs}
      />
    </Paper>
  );
};
