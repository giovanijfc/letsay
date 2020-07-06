import {
  GET_ALL_USERS,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAIL
} from '~/redux/actions/users';

import { UsersState, UsersActionTypes } from '~/redux/actions/users/types';

const initialState: UsersState = {
  getAllUsers: {
    success: [],
    fail: null,
    isLoading: false
  }
};

const user = (state = initialState, action: UsersActionTypes): UsersState => {
  switch (action.type) {
    case GET_ALL_USERS:
      return {
        ...initialState,
        getAllUsers: {
          ...initialState.getAllUsers,
          isLoading: true
        }
      };
    case GET_ALL_USERS_SUCCESS:
      return {
        ...initialState,
        getAllUsers: {
          ...initialState.getAllUsers,
          success: action.users,
          isLoading: false
        }
      };
    case GET_ALL_USERS_FAIL:
      return {
        ...initialState,
        getAllUsers: {
          ...initialState.getAllUsers,
          fail: action.fail,
          isLoading: false
        }
      };
    default:
      return {
        ...initialState,
        getAllUsers: state.getAllUsers
      };
  }
};

export default user;
