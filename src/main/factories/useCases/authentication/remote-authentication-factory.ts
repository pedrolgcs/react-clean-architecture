// factories
import { makeApiUrl, makeAxiosHttpClient } from '@/main/factories/http';

// domain
import { Authentication } from '@/domain/useCases/authentication';
import { AccountModel } from '@/domain/models';

// useCase
import { RemoteAuthentication } from '@/data/useCases/authentication/remote-authentication';

const makeRemoteAuthentication = (): Authentication => {
  const url = makeApiUrl('/login');
  const httpClient = makeAxiosHttpClient<AccountModel>();
  return new RemoteAuthentication(url, httpClient);
};

export { makeRemoteAuthentication };
