import { makeAuthProvider as AuthProvider } from './auth-provider-factory';

type MakeAppProviderProps = {
  children: unknown;
};

function makeAppProvider({ children }: MakeAppProviderProps) {
  return <AuthProvider>{children}</AuthProvider>;
}

export { makeAppProvider };
