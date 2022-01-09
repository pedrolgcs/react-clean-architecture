// page
import { Login } from '@/presentation/pages';

// factories
import { makeRemoteAuthentication } from '@/main/factories/useCases';

// validators
import { makeLoginValidation } from '@/main/factories/validations/login-validation-factory';

function makeLogin() {
  const remoteAuthentication = makeRemoteAuthentication();
  const loginValidation = makeLoginValidation();

  return (
    <Login authentication={remoteAuthentication} validation={loginValidation} />
  );
}

export { makeLogin };
