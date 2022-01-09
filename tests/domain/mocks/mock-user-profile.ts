import faker from 'faker';

import { UserProfile, UserProfileParams } from '@/domain/useCases';
import { UserModel } from '@/domain/models';

class RemoteUserProfileSpy implements UserProfile {
  private params: Record<string, string>;

  async execute(params: UserProfileParams): Promise<UserModel> {
    this.params = params;

    return Promise.resolve({
      id: faker.datatype.uuid(),
      name: faker.name.findName(),
      email: faker.internet.email(),
      permissions: [],
      roles: [],
    });
  }
}

export { RemoteUserProfileSpy };
