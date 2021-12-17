import * as faker from 'faker';

// protocols
import { HttpPostParams } from '../protocols/http';

const mockPostRequest = (): HttpPostParams<unknown> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement(),
});

export { mockPostRequest };
