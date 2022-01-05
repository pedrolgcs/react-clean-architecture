import faker from 'faker';

// domain
import { AccountModel } from '@/domain/models';

// useCases
import { Authentication, AuthenticationParams } from '@/domain/useCases';

// mocks
import { mockAccountModel } from '@/tests/domain/mocks';

const mockAuthenticationParams = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

const mockAuthenticationModel = () => mockAccountModel();

class AuthenticationSpy implements Authentication {
  account = mockAuthenticationModel();

  params: AuthenticationParams;

  callsCount = 0;

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    this.params = params;
    this.callsCount += 1;
    return this.account;
  }
}

export { mockAuthenticationParams, AuthenticationSpy, mockAuthenticationModel };
