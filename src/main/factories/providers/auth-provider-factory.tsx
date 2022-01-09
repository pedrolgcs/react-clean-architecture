// contexts
import { AuthProvider } from '@/presentation/contexts/authContext';

// useCases
import { makeUserProfile } from '@/main/factories/useCases/users';

type MakeLoginProps = {
  children: unknown;
};

function makeAuthProvider({ children }: MakeLoginProps) {
  const getUserProfile = makeUserProfile();

  return (
    <AuthProvider getUserProfile={getUserProfile}>{children}</AuthProvider>
  );
}

export { makeAuthProvider };
