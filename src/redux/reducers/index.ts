import { combineReducers } from 'redux';

import userReducer from './user';
import usersReducer from './users';
import chatsReducer from './chats';

import { UserState } from '~/redux/actions/user/types';
import { UsersState } from '~/redux/actions/users/types';
import { ChatsState } from '~/redux/actions/chats/types';

export interface RootState {
  user: UserState;
  users: UsersState;
  chats: ChatsState;
}

export default combineReducers({
  user: userReducer,
  users: usersReducer,
  chats: chatsReducer
});
