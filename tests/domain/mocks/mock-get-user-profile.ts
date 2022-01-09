import faker from 'faker';

import { GetUserProfile, GetUserProfileParams } from '@/domain/useCases';
import { UserModel } from '@/domain/models';

class GetUserProfileSpy implements GetUserProfile {
  private params: Record<string, string>;

  async execute(params: GetUserProfileParams): Promise<UserModel> {
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

export { GetUserProfileSpy };
