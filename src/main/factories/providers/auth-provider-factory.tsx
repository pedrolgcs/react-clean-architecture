// contexts
import { AuthProvider } from '@/presentation/contexts/authContext';

// useCases
import { makeGetUserProfile } from '@/main/factories/useCases/users';

type MakeLoginProps = {
  children: unknown;
};

function makeAuthProvider({ children }: MakeLoginProps) {
  return (
    <AuthProvider getUserProfile={makeGetUserProfile()}>
      {children}
    </AuthProvider>
  );
}

export { makeAuthProvider };
