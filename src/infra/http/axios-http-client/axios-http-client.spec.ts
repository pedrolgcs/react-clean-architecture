import * as faker from 'faker';
import axios from 'axios';

// client
import { AxiosHttpClient } from './axios-http-client';

// protocols
import { HttpPostParams } from '@/data/protocols/http';

// mocks
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockedAxiosResponse = {
  status: faker.datatype.number(),
  data: faker.random.objectElement(),
};

mockedAxios.post.mockResolvedValue(mockedAxiosResponse);

const mockPostRequest = (): HttpPostParams<unknown> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement(),
});

// factory
const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient();
};

describe('AxiosHttpClient', () => {
  it('Should call axios with correct values', async () => {
    const request = mockPostRequest();
    const sut = makeSut();

    await sut.post(request);

    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
  });

  it('Should return the correct statusCode and body', async () => {
    const sut = makeSut();

    const response = await sut.post(mockPostRequest());

    expect(response).toEqual({
      statusCode: mockedAxiosResponse.status,
      body: mockedAxiosResponse.data,
    });
  });
});

export {};
