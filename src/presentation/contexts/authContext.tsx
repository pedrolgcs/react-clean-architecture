import * as React from 'react';
import { setCookie, parseCookies } from 'nookies';

// domain
import { UserModel } from '@/domain/models';
import { UserProfile } from '@/domain/useCases/users';

type AuthContextValue = {
  user: UserModel | undefined;
  isAuthenticated: boolean;
  setUserToken: (token: string) => void;
};

type AuthProviderProps = {
  children: React.ReactNode;
  getUserProfile: UserProfile;
};

// context
const AuthContext = React.createContext({} as AuthContextValue);

// provider
function AuthProvider({ getUserProfile, children }: AuthProviderProps) {
  const [user, setUser] = React.useState<UserModel>();
  const [token, setToken] = React.useState(() => {
    return parseCookies(undefined).access_token;
  });

  const isAuthenticated = !!user;

  function setUserToken(token: string) {
    setToken(token);
    setCookie(undefined, 'access_token', token);
  }

  React.useEffect(() => {
    async function loadProfile() {
      if (token) {
        try {
          const profile = await getUserProfile.execute({ token });
          setUser(profile);
        } catch (error) {
          console.log(error);
        }
      }
    }

    loadProfile();
  }, [token, getUserProfile]);

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
