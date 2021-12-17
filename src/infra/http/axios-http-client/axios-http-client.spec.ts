import * as faker from 'faker';
import axios from 'axios';

// client
import { AxiosHttpClient } from './axios-http-client';

// mocks
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// factory
const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient();
};

describe('AxiosHttpClient', () => {
  it('Should call axios with correct URL', async () => {
    const url = faker.internet.url();
    const sut = makeSut();

    await sut.post({ url });

    expect(mockedAxios).toHaveBeenCalledWith(url);
  });
});

export {};
