import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import ActionTypes from '../constants/actionTypes';

const initialState = fromJS({
  isCompleted: false,
});

export default handleActions({
  [ActionTypes.ADDED_USER]: (state, { payload }) => console.log(5, !!payload.user.size) || (
    state.set('isCompleted', !!payload.user.size)
  ),
}, initialState);
