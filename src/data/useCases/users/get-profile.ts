// http
import { HttpClient, HttpStatusCode } from '@/data/protocols/http';

// erros
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors';

// models
import { UserModel } from '@/domain/models';

// useCases
import { GetUserProfile, GetUserProfileParams } from '@/domain/useCases/users';

class GetProfile implements GetUserProfile {
  private readonly url: string;

  private readonly httpClient: HttpClient<UserModel>;

  constructor(url: string, httpClient: HttpClient<UserModel>) {
    this.url = url;
    this.httpClient = httpClient;
  }

  async execute(params: GetUserProfileParams): Promise<UserModel> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'get',
      headers: {
        Authorization: `Bearer ${params.token}`,
      },
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

export { GetProfile };
