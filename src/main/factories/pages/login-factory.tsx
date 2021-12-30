// page
import { Login } from '@/presentation/pages';

// factories
import { makeRemoteAuthentication } from '@/main/factories/useCases';

function makeLogin() {
  return <Login authentication={makeRemoteAuthentication()} />;
}

export { makeLogin };
