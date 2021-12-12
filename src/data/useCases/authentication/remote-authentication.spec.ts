// mocks
import { HttpPostClientSpy } from '../../test/mock-http-client';

// useCase
import { RemoteAuthentication } from './remote-authentication';

// tests
describe('RemoteAuthentication', () => {
  it('Should call HttpClient with correct URL', async () => {
    const url = 'http://localhost:8080/authenticate';
    const httpPostClientSpy = new HttpPostClientSpy();
    const sut = new RemoteAuthentication(url, httpPostClientSpy);

    await sut.auth();

    expect(httpPostClientSpy.url).toBe(url);
  });
});
