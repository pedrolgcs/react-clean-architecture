// protocols
import { HttpPostClient } from '@/data/protocols/http/http-post-client';

// response
import { HttpStatusCode } from '@/data/protocols/http/http-response';

// erros
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error';
import { UnexpectedError } from '@/domain/errors/unexpected-error';

// models
import { AccountModel } from '@/domain/models/account-model';

// useCases
import {
  AuthenticationParams,
  Authentication,
} from '../../../domain/useCases/authentication';

class RemoteAuthentication implements Authentication {
  private readonly url: string;

  private readonly httpPostClient: HttpPostClient;

  constructor(url: string, httpClient: HttpPostClient) {
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
        return {} as AccountModel;
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError();
      default:
        throw new UnexpectedError();
    }
  }
}

export { RemoteAuthentication };
