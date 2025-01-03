import { createContext, useContext } from 'react';

interface TabSetterContextType {
  setSelectedTab: (tab: string) => void;
}

export const TabSetterContext = createContext<TabSetterContextType>(
  {} as TabSetterContextType
);
export const useTabSetterContext = () => useContext(TabSetterContext);
