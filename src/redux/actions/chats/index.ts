import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import RNdatabase, {
  FirebaseDatabaseTypes
} from '@react-native-firebase/database';

import { ChatsActionTypes } from './types';
import { RootState } from '~/redux/reducers/index';
import { Chat } from '~/models/chat';

import database from '~/services/firebase/database';

export const GET_ALL_CHATS_BY_ID_USER = 'GET_ALL_CHATS_BY_ID_USER';
export const GET_ALL_CHATS_BY_ID_USER_SUCCESS =
  'GET_ALL_CHATS_BY_ID_USER_SUCCESS';
export const GET_ALL_CHATS_BY_ID_USER_FAIL = 'GET_ALL_CHATS_BY_ID_USER_FAIL';

export const ADD_NEW_CHAT = 'ADD_NEW_CHAT';

export const UPDATE_CHAT = 'UPDATE_CHAT';

export const SET_ACTIVE_CHAT_ID = 'SET_ACTIVE_CHAT_ID';

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

export const onAddNewChat = (chat: Chat): ChatsActionTypes => ({
  type: ADD_NEW_CHAT,
  newChat: chat
});

export const updateChat = (chat: Chat): ChatsActionTypes => ({
  type: UPDATE_CHAT,
  updatedChat: chat
});

export const setActiveChatId = (
  chatId: string | undefined
): ChatsActionTypes => ({
  type: SET_ACTIVE_CHAT_ID,
  chatId
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

export const onAddNewChatServiceStart = (
  idUser: string
): ThunkAction<void, RootState, unknown, Action<string>> => dispatch => {
  RNdatabase()
    .ref('/chats')
    .orderByChild(`/usersIds/${idUser}/userLoggedId`)
    .equalTo(idUser)
    .limitToLast(1)
    .on('child_added', (snapshot: FirebaseDatabaseTypes.DataSnapshot) => {
      dispatch(onAddNewChat(snapshot.val()));
    });
};

export const onUpdateChatServiceStart = (
  idUser: string
): ThunkAction<void, RootState, unknown, Action<string>> => dispatch => {
  RNdatabase()
    .ref('/chats')
    .orderByChild(`/usersIds/${idUser}/userLoggedId`)
    .equalTo(idUser)
    .on('child_changed', (snapshot: FirebaseDatabaseTypes.DataSnapshot) => {
      dispatch(updateChat(snapshot.val()));
    });
};
