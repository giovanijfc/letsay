import {
  GET_USER_BY_ID,
  GET_USER_BY_ID_SUCCESS,
  GET_USER_BY_ID_FAIL,
  UserActionTypes,
  UserState
} from '~/redux/types';

const initialState: UserState = {
  getUserByid: {
    success: undefined,
    fail: undefined,
    isLoading: false
  }
};

const user = (state = initialState, action: UserActionTypes): UserState => {
  switch (action.type) {
    case GET_USER_BY_ID:
      return state;
    case GET_USER_BY_ID_SUCCESS:
      return state;
    case GET_USER_BY_ID_FAIL:
      return state;
    default:
      return state;
  }
};

export default user;
