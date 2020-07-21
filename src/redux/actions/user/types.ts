import { User } from '~/models/user';

import {
  AUTH_USER,
  AUTH_USER_SUCCESS,
  AUTH_USER_FAIL,
  REGISTER_USER,
  REGISTER_USER_FAIL,
  REGISTER_USER_SUCCESS,
  UPDATE_AUTH_USER_DATA,
  UPDATE_AUTH_USER_DATA_SUCCESS,
  UPDATE_AUTH_USER_DATA_FAIL,
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

interface updateAuthUserData {
  type: typeof UPDATE_AUTH_USER_DATA;
}

interface updateAuthUserDataSuccess {
  type: typeof UPDATE_AUTH_USER_DATA_SUCCESS;
  user: User;
}

interface updateAuthUserDataFail {
  type: typeof UPDATE_AUTH_USER_DATA_FAIL;
  fail: string;
}

interface resetState {
  type: typeof RESET_STATE;
}

export interface UserState {
  user?: User | undefined;
  authUser: {
    success?: User | undefined;
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
  | updateAuthUserData
  | updateAuthUserDataSuccess
  | updateAuthUserDataFail
  | resetState;
