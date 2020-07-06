import { combineReducers } from 'redux';

import userReducer from './user';
import usersReducer from './users';

import { UserState } from '~/redux/actions/user/types';
import { UsersState } from '~/redux/actions/users/types';

export interface RootState {
  user: UserState;
  users: UsersState;
}

export default combineReducers({
  user: userReducer,
  users: usersReducer
});
