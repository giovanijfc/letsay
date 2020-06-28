import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { UserActionTypes } from './types';
import { RootState } from '~/redux/reducers/index';
import { UserToCreate } from '~/services/firebase/database/user';

import database from '~/services/firebase/database';

export const GET_USER_BY_ID = 'GET_USER_BY_ID';
export const GET_USER_BY_ID_SUCCESS = 'GET_USER_BY_ID_SUCCESS';
export const GET_USER_BY_ID_FAIL = 'GET_USER_BY_ID_FAIL';

export const REGISTER_USER = 'REGISTER_USER';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAIL = 'REGISTER_USER_FAIL';

export const RESET_STATE = 'RESET_STATE';

export const resetState = (): UserActionTypes => ({
  type: RESET_STATE
});

const registerUser = (): UserActionTypes => ({
  type: REGISTER_USER
});

const registerUserSuccess = (): UserActionTypes => ({
  type: REGISTER_USER_SUCCESS
});

const registerUserFail = (fail: string): UserActionTypes => ({
  type: REGISTER_USER_FAIL,
  fail
});

export const registerUserRequest = (
  user: UserToCreate
): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {
  dispatch(registerUser());

  try {
    await database.user.create(user);

    dispatch(registerUserSuccess());
  } catch (error) {
    let message = 'Error interno do servidor';

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (error.code === 'auth/email-already-in-use') {
      message = 'Email já cadastrado, tente outro por favor.';
    }

    dispatch(registerUserFail(message));
  }
};
