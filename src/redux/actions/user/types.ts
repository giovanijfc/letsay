import { User } from '~/models/user';

import {
  AUTH_USER,
  AUTH_USER_SUCCESS,
  AUTH_USER_FAIL,
  REGISTER_USER,
  REGISTER_USER_FAIL,
  REGISTER_USER_SUCCESS,
  RESET_STATE
} from '.';

interface authUser {
  type: typeof AUTH_USER;
}

interface authUserSuccess {
  type: typeof AUTH_USER_SUCCESS;
  user: User;
}

interface authUserFail {
  type: typeof AUTH_USER_FAIL;
  fail: string;
}

interface registerUser {
  type: typeof REGISTER_USER;
}

interface registerUserSuccess {
  type: typeof REGISTER_USER_SUCCESS;
}

interface registerUserFail {
  type: typeof REGISTER_USER_FAIL;
  fail: string;
}

interface resetState {
  type: typeof RESET_STATE;
}

export interface UserState {
  user?: User | undefined;
  authUser: {
    success?: boolean | false;
    fail?: string | undefined;
    isLoading?: boolean;
  };
  registerUser: {
    success?: boolean | false;
    fail?: string | undefined;
    isLoading?: boolean | false;
  };
}

export type UserActionTypes =
  | authUser
  | authUserSuccess
  | authUserFail
  | registerUser
  | registerUserFail
  | registerUserSuccess
  | resetState;
