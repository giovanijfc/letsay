import { User } from '~/models/user';

import {
  GET_USER_BY_ID,
  GET_USER_BY_ID_SUCCESS,
  GET_USER_BY_ID_FAIL,
  REGISTER_USER,
  REGISTER_USER_FAIL,
  REGISTER_USER_SUCCESS,
  RESET_STATE
} from '.';

interface getUserById {
  type: typeof GET_USER_BY_ID;
}

interface getUserByIdSuccess {
  type: typeof GET_USER_BY_ID_SUCCESS;
  user: User;
}

interface getUserByIdFail {
  type: typeof GET_USER_BY_ID_FAIL;
  message: string;
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
  getUserByid: {
    success?: User | undefined;
    fail?: string | undefined;
    isLoading?: boolean;
  };
  registerUser: {
    success?: boolean | false;
    fail: string | undefined;
    isLoading?: boolean | false;
  };
}

export type UserActionTypes =
  | getUserById
  | getUserByIdSuccess
  | getUserByIdFail
  | registerUser
  | registerUserFail
  | registerUserSuccess
  | resetState;
