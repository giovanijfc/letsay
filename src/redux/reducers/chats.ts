import {
  GET_ALL_CHATS_BY_ID_USER,
  GET_ALL_CHATS_BY_ID_USER_FAIL,
  GET_ALL_CHATS_BY_ID_USER_SUCCESS,
  ADD_NEW_CHAT
} from '~/redux/actions/chats';

import { ChatsState, ChatsActionTypes } from '~/redux/actions/chats/types';

const initialState: ChatsState = {
  getAllChatsByIdUser: {
    success: [],
    fail: null,
    isLoading: false
  }
};

const user = (state = initialState, action: ChatsActionTypes): ChatsState => {
  switch (action.type) {
    case GET_ALL_CHATS_BY_ID_USER:
      return {
        ...state,
        getAllChatsByIdUser: {
          ...state.getAllChatsByIdUser,
          isLoading: true
        }
      };
    case GET_ALL_CHATS_BY_ID_USER_SUCCESS:
      return {
        ...state,
        getAllChatsByIdUser: {
          ...state.getAllChatsByIdUser,
          isLoading: false,
          success: action.chats
        }
      };
    case GET_ALL_CHATS_BY_ID_USER_FAIL:
      return {
        ...state,
        getAllChatsByIdUser: {
          ...state.getAllChatsByIdUser,
          isLoading: false,
          fail: action.fail
        }
      };
    case ADD_NEW_CHAT:
      return {
        ...state,
        getAllChatsByIdUser: {
          ...state.getAllChatsByIdUser,
          success: [...state.getAllChatsByIdUser?.success, action.newChat]
        }
      };
    default:
      return {
        ...initialState
      };
  }
};

export default user;
