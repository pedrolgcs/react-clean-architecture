import * as React from 'react';

// contexts
import { AuthProvider } from './authContext';

type GlobalProviderProps = {
  children: React.ReactNode;
};

function GlobalProvider({ children }: GlobalProviderProps) {
  return <AuthProvider>{children}</AuthProvider>;
}

export { GlobalProvider };
