// http
import { HttpPostClient, HttpStatusCode } from '@/data/protocols/http';

// erros
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors';

// models
import { AccountModel } from '@/domain/models';

// useCases
import { AuthenticationParams, Authentication } from '@/domain/useCases';

class RemoteAuthentication implements Authentication {
  private readonly url: string;

  private readonly httpPostClient: HttpPostClient<
    AuthenticationParams,
    AccountModel
  >;

  constructor(
    url: string,
    httpClient: HttpPostClient<AuthenticationParams, AccountModel>,
  ) {
    this.url = url;
    this.httpPostClient = httpClient;
  }

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.success:
        return httpResponse.body;
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError();
      default:
        throw new UnexpectedError();
    }
  }
}

export { RemoteAuthentication };
