import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import ActionTypes from '../constants/actionTypes';

const initialState = fromJS({
  isCompleted: false,
  isLogout: false
});

export default handleActions({
  [ActionTypes.ADDED_USER]: (state, { payload }) => (
    state.set('isCompleted', !!payload.user.size)
  ),
  [ActionTypes.UPDATED_EMAIL]: (state, { payload }) => (
    state.set('isLogout', true)
  ),
}, initialState);
