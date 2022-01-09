import { UserModel } from '@/domain/models';

export type UserProfileParams = {
  token: string;
};

export interface UserProfile {
  execute(params: UserProfileParams): Promise<UserModel>;
}
