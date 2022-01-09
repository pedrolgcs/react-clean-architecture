// factories
import { makeApiUrl, makeAxiosHttpClient } from '@/main/factories/http';

// domain
import { UserProfile } from '@/domain/useCases/users';
import { UserModel } from '@/domain/models';

// useCase
import { RemoteUserProfile } from '@/data/useCases/users';

const makeUserProfile = (): UserProfile => {
  const url = makeApiUrl('/me');
  const httpClient = makeAxiosHttpClient<UserModel>();
  return new RemoteUserProfile(url, httpClient);
};

export { makeUserProfile };
