import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { ChatsActionTypes } from './types';
import { RootState } from '~/redux/reducers/index';
import { Chat } from '~/models/chat';

import database from '~/services/firebase/database';

export const GET_ALL_CHATS_BY_ID_USER = 'GET_ALL_CHATS_BY_ID_USER';
export const GET_ALL_CHATS_BY_ID_USER_SUCCESS =
  'GET_ALL_CHATS_BY_ID_USER_SUCCESS';
export const GET_ALL_CHATS_BY_ID_USER_FAIL = 'GET_ALL_CHATS_BY_ID_USER_FAIL';

const getAllChatsByIdUser = (): ChatsActionTypes => ({
  type: GET_ALL_CHATS_BY_ID_USER
});

const getAllChatsByIdUserSuccess = (chats: Chat[]): ChatsActionTypes => ({
  type: GET_ALL_CHATS_BY_ID_USER_SUCCESS,
  chats
});

const getAllChatsByIdUserFail = (fail: string): ChatsActionTypes => ({
  type: GET_ALL_CHATS_BY_ID_USER_FAIL,
  fail
});

export const getAllChatsByIdUserRequest = (
  idUser: string
): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {
  dispatch(getAllChatsByIdUser());

  try {
    const chats: Chat[] = await database.chat.getChatsByIdUser(idUser);

    dispatch(getAllChatsByIdUserSuccess(chats));
  } catch (error) {
    const message = 'Error interno do servidor.';

    dispatch(getAllChatsByIdUserFail(message));
  }
};
