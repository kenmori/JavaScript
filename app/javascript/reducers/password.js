import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import actionTypes from '../constants/actionTypes';

const initialState = fromJS({
  isRecoverd: false,
  isReseted: false,
});

export default handleActions({
  [actionTypes.RECOVERED_PASSWORD]: (state, { payload }) => (
    state.set('isRecoverd', payload)
  ),
}, initialState);
