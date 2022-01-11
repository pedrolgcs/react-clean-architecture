/* eslint-disable no-promise-executor-return */
import * as React from 'react';
import { setCookie, parseCookies } from 'nookies';

// domain
import { UserModel } from '@/domain/models';

// useCases
import { RemoteUserProfile } from '@/data/useCases/users';

type AuthContextValue = {
  user: UserModel | undefined;
  isAuthenticated: boolean;
  setUserToken: (token: string) => void;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

// context
const AuthContext = React.createContext({} as AuthContextValue);

// inicialize
const getUserProfile = new RemoteUserProfile();

// provider
function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = React.useState<UserModel>();
  const [token, setToken] = React.useState(() => {
    return parseCookies(undefined).access_token;
  });

  const isAuthenticated = !!token;

  function setUserToken(token: string) {
    setToken(token);
    setCookie(undefined, 'access_token', token);
  }

  React.useEffect(() => {
    async function loadProfile() {
      if (token) {
        try {
          const profile = await getUserProfile.execute();
          setUser(profile);
        } catch (error) {
          console.log(error);
        }
      }
    }

    loadProfile();
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, setUserToken }}>
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => {
  return React.useContext(AuthContext);
};

export { AuthProvider, useAuth };
