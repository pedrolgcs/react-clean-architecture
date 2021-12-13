import { HttpPostClient } from '../../protocols/http/http-post-client';

class RemoteAuthentication {
  private readonly url: string;

  private readonly httpPostClient: HttpPostClient;

  constructor(url: string, httpClient: HttpPostClient) {
    this.url = url;
    this.httpPostClient = httpClient;
  }

  async auth(): Promise<void> {
    await this.httpPostClient.post({
      url: this.url,
    });
  }
}

export { RemoteAuthentication };
