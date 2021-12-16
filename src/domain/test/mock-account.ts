import * as faker from 'faker';

// models
import { AccountModel } from '../models';

// useCases
import { AuthenticationParams } from '@/domain/useCases/authentication';

const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

const mockAccountModel = (): AccountModel => ({
  accessToken: faker.datatype.uuid(),
});

export { mockAuthentication, mockAccountModel };
