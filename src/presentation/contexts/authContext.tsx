import * as React from 'react';

type User = {
  email: string;
  permissions: string[];
  roles: string[];
};

type AuthContextValue = {
  user: User | undefined;
  isAuthenticated: boolean;
  setToken: (token: string) => void;
};

const AuthContext = React.createContext({} as AuthContextValue);

type AuthProviderProps = {
  children: React.ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
  const [user] = React.useState<User>();
  const isAuthenticated = !!user;

  function setToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => {
  return React.useContext(AuthContext);
};

export { AuthProvider, useAuth };
