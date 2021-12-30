import { makeApiUrl, makeAxiosHttpClient } from '@/main/factories/http';

// domain
import { Authentication } from '@/domain/useCases/authentication';

// useCase
import { RemoteAuthentication } from '@/data/useCases/authentication/remote-authentication';

export const makeRemoteAuthentication = (): Authentication => {
  const url = makeApiUrl('login');
  const httpClient = makeAxiosHttpClient();
  return new RemoteAuthentication(url, makeAxiosHttpClient());
};
