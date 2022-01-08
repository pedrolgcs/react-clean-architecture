import { ReactNode } from 'react';

// providers
import { AuthProvider } from './authContext';

type AppProviderProps = {
  children: ReactNode;
};

function AppProvider({ children }: AppProviderProps) {
  return <AuthProvider>{children}</AuthProvider>;
}

export { AppProvider };
