import * as React from 'react';

type AuthContextValue = {
  setToken: (token: string) => void;
};

const AuthContext = React.createContext({} as AuthContextValue);

type AuthProviderProps = {
  children: React.ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
  function setToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  return (
    <AuthContext.Provider value={{ setToken }}>{children}</AuthContext.Provider>
  );
}

const useAuth = () => {
  return React.useContext(AuthContext);
};

export { AuthProvider, useAuth };
