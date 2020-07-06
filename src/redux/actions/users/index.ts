import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import Fauth from '@react-native-firebase/auth';

import { UsersActionTypes } from './types';
import { RootState } from '~/redux/reducers/index';
import { User } from '~/models/user';

import database from '~/services/firebase/database';

export const GET_ALL_USERS = 'GET_ALL_USERS';
export const GET_ALL_USERS_SUCCESS = 'GET_ALL_USERS_SUCCESS';
export const GET_ALL_USERS_FAIL = 'GET_ALL_USERS_FAIL';

const getAllUsers = (): UsersActionTypes => ({
  type: GET_ALL_USERS
});

const getAllUsersSuccess = (users: User[]): UsersActionTypes => ({
  type: GET_ALL_USERS_SUCCESS,
  users
});

const getAllUsersFail = (fail: string): UsersActionTypes => ({
  type: GET_ALL_USERS_FAIL,
  fail
});

export const getAllUsersRequest = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => async dispatch => {
  dispatch(getAllUsers());

  try {
    let users = Object.values(await database.user.getAll());
    const userLoggedId = Fauth().currentUser?.uid;

    users = users.filter(({ id }) => id !== userLoggedId);

    dispatch(getAllUsersSuccess(users));
  } catch (error) {
    console.log(error);
    const message = 'Error interno do servidor.';

    dispatch(getAllUsersFail(message));
  }
};
