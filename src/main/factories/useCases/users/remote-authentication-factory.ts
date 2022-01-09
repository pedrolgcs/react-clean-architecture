// factories
import { makeApiUrl, makeAxiosHttpClient } from '@/main/factories/http';

// domain
import { Authentication } from '@/domain/useCases/users';
import { AccountModel } from '@/domain/models';

// useCase
import { RemoteAuthentication } from '@/data/useCases';

const makeRemoteAuthentication = (): Authentication => {
  const url = makeApiUrl('/login');
  const httpClient = makeAxiosHttpClient<AccountModel>();
  return new RemoteAuthentication(url, httpClient);
};

export { makeRemoteAuthentication };
