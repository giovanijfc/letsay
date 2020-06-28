import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { UserActionTypes } from './types';
import { RootState } from '~/redux/reducers/index';
import { Credentials } from '~/models/credentials';
import { User } from '~/models/user';

import database from '~/services/firebase/database';

export const AUTH_USER = 'AUTH_USER';
export const AUTH_USER_SUCCESS = 'AUTH_USER_SUCCESS';
export const AUTH_USER_FAIL = 'AUTH_USER_FAIL';

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

const authUser = (): UserActionTypes => ({
  type: AUTH_USER
});

const authUserSuccess = (user: User): UserActionTypes => ({
  type: AUTH_USER_SUCCESS,
  user
});

const authUserFail = (fail: string): UserActionTypes => ({
  type: AUTH_USER_FAIL,
  fail
});

export const registerUserRequest = (
  user: User
): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {
  dispatch(registerUser());

  try {
    await database.user.register(user);

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

export const authUserRequest = (
  credentials: Credentials
): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {
  dispatch(authUser());

  try {
    const user = await database.user.auth(credentials);

    dispatch(authUserSuccess(user));
  } catch (error) {
    console.log(error);
    let message = 'Error interno do servidor';

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (error.code === 'auth/user-not-found') {
      message = 'Conta não encontrada';
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    } else if (error.code === 'auth/wrong-password') {
      message = 'Senha incorreta';
    }

    dispatch(authUserFail(message));
  }
};
