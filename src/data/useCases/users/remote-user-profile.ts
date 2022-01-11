// models
import { UserModel } from '@/domain/models';

// useCases
import { UserProfile } from '@/domain/useCases/users';

// infra
import { apiClient } from '@/infra/http';

class RemoteUserProfile implements UserProfile {
  async execute(): Promise<UserModel> {
    const httpResponse = await apiClient.get<UserModel>('/me');

    return httpResponse.data;
  }
}

export { RemoteUserProfile };
