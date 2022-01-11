// models
import { AccountModel } from '@/domain/models';

// useCases
import { AuthenticationParams, Authentication } from '@/domain/useCases/users';

// infra
import { apiClient } from '@/infra/http';

class RemoteAuthentication implements Authentication {
  async execute(params: AuthenticationParams): Promise<AccountModel> {
    const httpResponse = await apiClient.post<AccountModel>('/login', {
      params,
    });

    return httpResponse.data;
  }
}

export { RemoteAuthentication };
