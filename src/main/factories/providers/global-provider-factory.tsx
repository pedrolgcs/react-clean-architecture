import { makeAuthProvider as AuthProvider } from './auth-provider-factory';

type GlobalProviderProps = {
  children: unknown;
};

function GlobalProvider({ children }: GlobalProviderProps) {
  return <AuthProvider>{children}</AuthProvider>;
}

export { GlobalProvider };
