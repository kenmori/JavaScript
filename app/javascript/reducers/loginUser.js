import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import ActionTypes from '../constants/actionTypes';
import gon from '../utils/gon';

const loginUser = gon.get('loginUser');
const initialState = fromJS(loginUser ? {
  isAdmin: loginUser.get('admin'),
  id: loginUser.get('id'),
  lastName: loginUser.get('lastName'),
  firstName: loginUser.get('firstName'),
  email: loginUser.get('email'),
  avatarUrl: loginUser.getIn(['avatar', 'url']),
  userSetting: gon.get('userSetting'),
} : { userSetting: {} });

export default handleActions({
  [ActionTypes.UPDATED_USER]: (state, { payload }) => (
    state.get('id') === payload.user.get('id') ? state.merge(payload.user) : state
  ),
  [ActionTypes.UPDATED_AVATAR]: (state, { payload }) => (
    state.get('id') === payload.user.get('id') ? state.merge(payload.user) : state
  ),
  [ActionTypes.UPDATED_USER_SETTING]: (state, { payload }) => {
    return state.set('userSetting', payload.userSetting)
  },
}, initialState);
