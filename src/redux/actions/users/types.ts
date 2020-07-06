import { User } from '~/models/user';

import { GET_ALL_USERS, GET_ALL_USERS_FAIL, GET_ALL_USERS_SUCCESS } from '.';

interface getAllUsers {
  type: typeof GET_ALL_USERS;
}

interface getAllUsersSuccess {
  type: typeof GET_ALL_USERS_SUCCESS;
  users: User[];
}

interface getAllUsersFail {
  type: typeof GET_ALL_USERS_FAIL;
  fail: string;
}

export interface UsersState {
  getAllUsers: {
    success?: User[] | [];
    fail?: string | null;
    isLoading?: boolean | false;
  };
}

export type UsersActionTypes =
  | getAllUsers
  | getAllUsersFail
  | getAllUsersSuccess;
