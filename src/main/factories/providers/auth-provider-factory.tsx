// provider
import { AuthProvider } from '@/presentation/contexts/authContext';

// useCases
import { makeUserProfile } from '@/main/factories/useCases/';

type MakeAuthProviderProps = {
  children: unknown;
};

function makeAuthProvider({ children }: MakeAuthProviderProps) {
  const getUserProfile = makeUserProfile();

  return (
    <AuthProvider getUserProfile={getUserProfile}>{children}</AuthProvider>
  );
}

export { makeAuthProvider };
