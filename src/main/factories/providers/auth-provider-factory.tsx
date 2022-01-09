// contexts
import { AuthProvider } from '@/presentation/contexts/authContext';

// useCases
import { makeUserProfile } from '@/main/factories/useCases/users';

type MakeLoginProps = {
  children: unknown;
};

function makeAuthProvider({ children }: MakeLoginProps) {
  return (
    <AuthProvider getUserProfile={makeUserProfile()}>{children}</AuthProvider>
  );
}

export { makeAuthProvider };
