import { Chat } from '~/models/chat';
import {
  GET_ALL_CHATS_BY_ID_USER,
  GET_ALL_CHATS_BY_ID_USER_FAIL,
  GET_ALL_CHATS_BY_ID_USER_SUCCESS,
  ADD_NEW_CHAT,
  UPDATE_CHAT
} from '.';

interface getAllChatsByIdUser {
  type: typeof GET_ALL_CHATS_BY_ID_USER;
}

interface getAllChatsByIdUserSuccess {
  type: typeof GET_ALL_CHATS_BY_ID_USER_SUCCESS;
  chats: Chat[];
}

interface getAllChatsByIdUserFail {
  type: typeof GET_ALL_CHATS_BY_ID_USER_FAIL;
  fail: string;
}

interface addNewChat {
  type: typeof ADD_NEW_CHAT;
  newChat: Chat;
}

interface updateChat {
  type: typeof UPDATE_CHAT;
  updatedChat: Chat;
}

export interface ChatsState {
  getAllChatsByIdUser: {
    success?: Chat[] | [];
    fail?: string | null;
    isLoading?: boolean | false;
  };
}

export type ChatsActionTypes =
  | getAllChatsByIdUser
  | getAllChatsByIdUserFail
  | getAllChatsByIdUserSuccess
  | addNewChat
  | updateChat;
