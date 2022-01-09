import * as React from 'react';

// domain
import { UserModel } from '@/domain/models';

// useCases
import { makeUserProfile } from '@/main/factories/useCases';

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

// initializer
const getUserProfile = makeUserProfile();

// provider
function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = React.useState<UserModel>();
  const [token, setToken] = React.useState(() => {
    return localStorage.getItem('access_token');
  });

  const isAuthenticated = !!user;

  function setUserToken(token: string) {
    setToken(token);
    localStorage.setItem('access_token', token);
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
