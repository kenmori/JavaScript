import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import ActionTypes from '../constants/actionTypes';

function set (state, { payload }) {
  const index = state.findIndex(user => user.get('id') === payload.user.get('id'));
  return state.set(index, payload.user);
}

export default handleActions({
    [ActionTypes.FETCHED_ORGANIZATION]: (state, { payload }) => {
      return payload.organization.get('members');
    },
    [ActionTypes.FETCHED_USER]: (state, { payload }) => {
      return payload.user;
    },
    [ActionTypes.FETCHED_USERS]: (state, { payload }) => {
      return state.merge(payload.users);
    },
    [ActionTypes.ADDED_USER]: (state, { payload }) => (
      state.push(payload.user)
    ),
    [ActionTypes.UPDATED_USER]: set,
    [ActionTypes.UPDATED_EMAIL]: set,
    [ActionTypes.UPDATED_PASSWORD]: set,
    [ActionTypes.UPDATED_AVATAR]: set,
    [ActionTypes.REMOVED_USER]: set,
    [ActionTypes.RESTORED_USER]: set,
  },
  fromJS([])
);
