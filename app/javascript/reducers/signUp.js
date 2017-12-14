import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import ActionTypes from '../constants/actionTypes';

const initialState = fromJS({
  isCompleted: false,
  needLogout: false
});

export default handleActions({
  [ActionTypes.ADDED_USER]: (state, { payload }) => (
    state.set('isCompleted', !!payload.user.size)
  ),
  [ActionTypes.UPDATED_EMAIL]: (state, { payload }) => (
    payload.user.get('notLogout') ? state : state.set('needLogout', true)
  ),
}, initialState);
