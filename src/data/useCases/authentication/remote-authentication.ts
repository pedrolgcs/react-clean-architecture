// http
import { HttpClient, HttpStatusCode } from '@/data/protocols/http';

// erros
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors';

// models
import { AccountModel } from '@/domain/models';

// useCases
import { AuthenticationParams, Authentication } from '@/domain/useCases';

class RemoteAuthentication implements Authentication {
  private readonly url: string;

  private readonly httpClient: HttpClient<AccountModel>;

  constructor(url: string, httpClient: HttpClient<AccountModel>) {
    this.url = url;
    this.httpClient = httpClient;
  }

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'post',
      body: params,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body;
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError();
      default:
        throw new UnexpectedError();
    }
  }
}

export { RemoteAuthentication };
