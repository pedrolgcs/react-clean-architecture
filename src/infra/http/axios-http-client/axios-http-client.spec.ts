import axios from 'axios';

// client
import { AxiosHttpClient } from './axios-http-client';

// mocks
import { mockAxios } from '@/infra/test';
import { mockPostRequest } from '@/data/test';

jest.mock('axios');

type SutTypes = {
  sut: AxiosHttpClient;
  mockedAxios: jest.Mocked<typeof axios>;
};

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient();
  const mockedAxios = mockAxios();

  return { sut, mockedAxios };
};

describe('AxiosHttpClient', () => {
  it('Should call axios with correct values', async () => {
    const request = mockPostRequest();
    const { sut, mockedAxios } = makeSut();

    await sut.post(request);

    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
  });

  it('Should return the correct statusCode and body', async () => {
    const { sut, mockedAxios } = makeSut();

    const promiseResponse = sut.post(mockPostRequest());

    expect(promiseResponse).toEqual(mockedAxios.post.mock.results[0].value);
  });
});

export {};
