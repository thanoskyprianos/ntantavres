import { Dispatch, ReactElement, ReactNode } from 'react';
import { Tab, TabProps, Tabs, TabsProps } from '@mui/material';

export interface NavTab {
  title: string;
  paramRoute?: string;
  icon?: ReactElement;
  content?: ReactNode;
}

export interface TabSetter {
  setSelectedTab: Dispatch<string | number>;
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
      {tabs?.map(({ title, icon }) => (
        <Tab
          {...tabProps}
          label={showLabels ? title : undefined}
          icon={icon}
          key={title}
        />
      ))}
    </Tabs>
  );
};
