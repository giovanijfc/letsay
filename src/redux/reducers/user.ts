import {
  GET_USER_BY_ID,
  GET_USER_BY_ID_SUCCESS,
  GET_USER_BY_ID_FAIL,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL
} from '~/redux/actions/user';

import { UserState, UserActionTypes } from '~/redux/actions/user/types';

const initialState: UserState = {
  getUserByid: {
    success: undefined,
    fail: undefined,
    isLoading: false
  },
  registerUser: {
    success: false,
    fail: undefined,
    isLoading: false
  }
};

const user = (state = initialState, action: UserActionTypes): UserState => {
  switch (action.type) {
    case REGISTER_USER:
      return {
        ...state,
        registerUser: {
          ...state.registerUser,
          isLoading: true
        }
      };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        registerUser: {
          ...state.registerUser,
          success: true,
          isLoading: false
        }
      };
    case REGISTER_USER_FAIL:
      return {
        ...state,
        registerUser: {
          ...state.registerUser,
          fail: action.fail,
          isLoading: false
        }
      };
    case GET_USER_BY_ID:
      return state;
    case GET_USER_BY_ID_SUCCESS:
      return state;
    case GET_USER_BY_ID_FAIL:
      return state;
    default:
      return initialState;
  }
};

export default user;
