import faker from 'faker';

// domain
import { AccountModel } from '@/domain/models';

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.datatype.uuid(),
});
