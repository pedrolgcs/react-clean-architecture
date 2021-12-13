import * as faker from 'faker';

// mocks
import { HttpPostClientSpy } from '../../test/mock-http-client';

// useCase
import { RemoteAuthentication } from './remote-authentication';

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpPostClientSpy;
};

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy();
  const sut = new RemoteAuthentication(url, httpPostClientSpy);

  return { sut, httpPostClientSpy };
};

describe('RemoteAuthentication', () => {
  it('Should call HttpClient with correct URL', async () => {
    const URL = faker.internet.url();
    const { sut, httpPostClientSpy } = makeSut(URL);

    await sut.auth();

    expect(httpPostClientSpy.url).toBe(URL);
  });
});
