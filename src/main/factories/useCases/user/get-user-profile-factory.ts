// factories
import { makeApiUrl, makeAxiosHttpClient } from '@/main/factories/http';

// domain
import { GetUserProfile } from '@/domain/useCases';
import { UserModel } from '@/domain/models';

// useCase
import { GetProfile } from '@/data/useCases/users/get-profile';

const makeGetUserProfile = (): GetUserProfile => {
  const url = makeApiUrl('/me');
  const httpClient = makeAxiosHttpClient<UserModel>();
  return new GetProfile(url, httpClient);
};

export { makeGetUserProfile };
