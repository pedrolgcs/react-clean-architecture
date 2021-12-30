import { AxiosHttpClient } from '@/infra/http';

function makeAxiosHttpClient<T>() {
  return new AxiosHttpClient<T>();
}

export { makeAxiosHttpClient };
