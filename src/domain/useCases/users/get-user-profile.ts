import { UserModel } from '@/domain/models';

export type GetUserProfileParams = {
  token: string;
};

export interface GetUserProfile {
  execute(params: GetUserProfileParams): Promise<UserModel>;
}
