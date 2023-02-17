import { User } from '@/api/models';

export type UserState = User;

export type UserContextType = {
  state: UserState;
  setUserState: () => Promise<void>;
  clearUserState: () => void;
};
