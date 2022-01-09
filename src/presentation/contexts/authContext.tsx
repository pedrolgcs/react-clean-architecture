import * as React from 'react';

// domain
import { UserModel } from '@/domain/models';
import { UserProfile } from '@/domain/useCases';

type AuthContextValue = {
  user: UserModel | undefined;
  isAuthenticated: boolean;
  setToken: (token: string) => void;
};

const AuthContext = React.createContext({} as AuthContextValue);

type AuthProviderProps = {
  children: React.ReactNode;
  getUserProfile: UserProfile;
};

function AuthProvider({ getUserProfile, children }: AuthProviderProps) {
  const [user, setUser] = React.useState<UserModel>();
  const isAuthenticated = !!user;

  React.useEffect(() => {
    async function loadProfile() {
      const token = localStorage.getItem('access_token');

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
  }, [getUserProfile]);

  function setToken(token: string) {
    localStorage.setItem('access_token', token);
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
