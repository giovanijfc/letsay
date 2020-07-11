import {
  GET_ALL_CHATS_BY_ID_USER,
  GET_ALL_CHATS_BY_ID_USER_FAIL,
  GET_ALL_CHATS_BY_ID_USER_SUCCESS,
  ADD_NEW_CHAT,
  UPDATE_CHAT
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
      if (state.getAllChatsByIdUser?.success?.length > 0) {
        return {
          ...state,
          getAllChatsByIdUser: {
            ...state.getAllChatsByIdUser,
            success: [
              ...state.getAllChatsByIdUser?.success?.filter(
                ({ id }) => id !== action.newChat.id
              ),
              action.newChat
            ]
          }
        };
      }

      return {
        ...state,
        getAllChatsByIdUser: {
          ...state.getAllChatsByIdUser,
          success: [action.newChat]
        }
      };
    case UPDATE_CHAT:
      if (state.getAllChatsByIdUser?.success?.length > 0) {
        return {
          ...state,
          getAllChatsByIdUser: {
            ...state.getAllChatsByIdUser,
            success: [
              ...state.getAllChatsByIdUser?.success?.filter(
                ({ id }) => id !== action.updatedChat.id
              ),
              action.updatedChat
            ]
          }
        };
      }

      return {
        ...state,
        getAllChatsByIdUser: {
          ...state.getAllChatsByIdUser,
          success: [action.updatedChat]
        }
      };

    default:
      return state;
  }
};

export default user;
