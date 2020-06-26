import { User } from '~/types';

export const GET_USER_BY_ID = 'GET_USER_BY_ID';
export const GET_USER_BY_ID_SUCCESS = 'GET_USER_BY_ID_SUCCESS';
export const GET_USER_BY_ID_FAIL = 'GET_USER_BY_ID_FAIL';

interface getUserByIdAction {
  type: typeof GET_USER_BY_ID;
}

interface getUserByIdSuccessAction {
  type: typeof GET_USER_BY_ID_SUCCESS;
  user: User;
}

interface getUserByIdFailAction {
  type: typeof GET_USER_BY_ID_FAIL;
  message: string;
}

export interface UserState {
  getUserByid: {
    success?: User | undefined;
    fail?: string | undefined;
    isLoading?: boolean;
  };
}

export type UserActionTypes =
  | getUserByIdAction
  | getUserByIdSuccessAction
  | getUserByIdFailAction;
