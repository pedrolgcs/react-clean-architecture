import * as faker from 'faker';

import { AuthenticationParams } from '../useCases/authentication';

const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export { mockAuthentication };
