import axios from 'axios';
import * as faker from 'faker';

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  // resolve all requests to return a fake response
  mockedAxios.post.mockResolvedValue({
    status: faker.datatype.number(),
    data: faker.random.objectElement(),
  });

  return mockedAxios;
};
