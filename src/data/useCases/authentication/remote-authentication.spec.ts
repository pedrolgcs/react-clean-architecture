// protocols
import { HttpPostClient } from '../../protocols/http/http-post-client';

// useCase
import { RemoteAuthentication } from './remote-authentication';

// tests
describe('RemoteAuthentication', () => {
  it('Should call HttpClient with correct URL', async () => {
    class HttpPostClientSpy implements HttpPostClient {
      url?: string;

      async post(url: string): Promise<void> {
        this.url = url;
        return Promise.resolve();
      }
    }
    const url = 'http://localhost:8080/authenticate';
    const httpPostClientSpy = new HttpPostClientSpy();
    const sut = new RemoteAuthentication(url, httpPostClientSpy);

    await sut.auth();

    expect(httpPostClientSpy.url).toBe(url);
  });
});
