// page
import { Login } from '@/presentation/pages';

// factories
import { makeRemoteAuthentication } from '@/main/factories/useCases';

// validators
import { validate } from '@/validation/validators/login';

function makeLogin() {
  return (
    <Login authentication={makeRemoteAuthentication()} validation={validate} />
  );
}

export { makeLogin };
