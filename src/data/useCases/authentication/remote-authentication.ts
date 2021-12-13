// protocols
import { HttpPostClient } from '@/data/protocols/http/http-post-client';

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
    await this.httpPostClient.post({
      url: this.url,
      body: params,
    });

    return {} as AccountModel;
  }
}

export { RemoteAuthentication };
