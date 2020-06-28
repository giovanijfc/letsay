import { combineReducers } from 'redux';
import userReducer from './user';

import { UserState } from '~/redux/actions/user/types';

export interface RootState {
  user: UserState;
}

export default combineReducers({
  user: userReducer
});
