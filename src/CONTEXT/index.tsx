import React from 'react';
import { UserContextProvider } from './userContext';
import { SearchContextProvider } from './contextSearch';

interface GlobalContextType {
  children: any;
}

const GlobalContext: React.FC<GlobalContextType> = ({ children }) => {
  return (
    <UserContextProvider>
      <SearchContextProvider>{children}</SearchContextProvider>
    </UserContextProvider>
  );
};

export default GlobalContext;
