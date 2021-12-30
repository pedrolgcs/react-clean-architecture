// page
import { Login } from '@/presentation/pages';

// factories
import { makeRemoteAuthentication } from '@/main/factories/useCases';

// validators
import { makeLoginValidation } from '@/main/factories/validations/login-validation-factory';

function makeLogin() {
  return (
    <Login
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
    />
  );
}

export { makeLogin };
