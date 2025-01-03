import { ReactElement, ReactNode } from 'react';
import { Tab, TabProps, Tabs, TabsProps } from '@mui/material';
import { Role } from '@/types/UserDetails.ts';
import { Link } from 'react-router-dom';

export interface NavTab {
  title: string;
  paramRoute: string;
  icon?: ReactElement;
  content?: ReactNode;
  privateTab?: boolean;
  role: Role | 'BOTH';
}

interface TabNavProps {
  tabProps?: TabProps;
  tabsProps?: TabsProps;
  tabs?: NavTab[];
  showLabels?: boolean;
}

export const TabNav = ({
  tabProps,
  tabsProps,
  tabs,
  showLabels = true,
}: TabNavProps) => {
  return (
    <Tabs {...tabsProps}>
      {tabs?.map(tab => (
        <Tab
          to={`?tab=${tab.paramRoute}`}
          component={Link}
          {...tabProps}
          label={showLabels ? tab.title : undefined}
          icon={tab.icon}
          key={tab.title}
        />
      ))}
    </Tabs>
  );
};
