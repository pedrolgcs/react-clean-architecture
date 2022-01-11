import { UserModel } from '@/domain/models';

export interface UserProfile {
  execute(): Promise<UserModel>;
}
