import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import ActionTypes from '../constants/actionTypes';

export default handleActions({
    [ActionTypes.FETCHED_ORGANIZATION]: (state, { payload }) => {
      return payload.organization.get('disabledMembers');
    },
    [ActionTypes.REMOVED_USER]: (state, { payload }) => {
      return state.push(payload.user).sortBy(user => user.get('id'))
    },
    [ActionTypes.RESTORED_USER]: (state, { payload }) => {
      return state.filter((user) => {
        return user.get('id') !== payload.user.get('id');
      });
    },
  },
  fromJS([])
);
