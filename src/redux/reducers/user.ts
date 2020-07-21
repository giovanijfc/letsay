import {
  AUTH_USER,
  AUTH_USER_SUCCESS,
  AUTH_USER_FAIL,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  UPDATE_AUTH_USER_DATA,
  UPDATE_AUTH_USER_DATA_SUCCESS,
  UPDATE_AUTH_USER_DATA_FAIL
} from '~/redux/actions/user';

import { UserState, UserActionTypes } from '~/redux/actions/user/types';

const initialState: UserState = {
  user: undefined,
  authUser: {
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
    case AUTH_USER:
      return {
        ...state,
        authUser: {
          ...state.authUser,
          isLoading: true
        }
      };
    case AUTH_USER_SUCCESS:
      return {
        ...state,
        user: action.user,
        authUser: {
          ...state.authUser,
          success: action.user,
          isLoading: false
        }
      };
    case AUTH_USER_FAIL:
      return {
        ...state,
        authUser: {
          ...state.authUser,
          isLoading: false,
          fail: action.fail
        }
      };
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
          fail: action?.fail,
          isLoading: false
        }
      };
    case UPDATE_AUTH_USER_DATA:
      return {
        ...state,
        authUser: {
          ...state.authUser,
          isLoading: true
        }
      };
    case UPDATE_AUTH_USER_DATA_SUCCESS:
      return {
        ...state,
        authUser: {
          ...state.authUser,
          isLoading: false,
          success: action.user
        }
      };
    case UPDATE_AUTH_USER_DATA_FAIL:
      return {
        ...state,
        authUser: {
          ...state.authUser,
          isLoading: false,
          fail: action.fail
        }
      };

    default:
      return {
        ...initialState,
        user: state.user
      };
  }
};

export default user;
