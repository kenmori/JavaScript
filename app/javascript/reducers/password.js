import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import actionTypes from '../constants/actionTypes';

const initialState = fromJS({
  isRecoverd: false,
  isEdited: false,
});

export default handleActions({
  [actionTypes.RECOVERED_PASSWORD]: (state, { payload }) => (
    state.set('isRecoverd', payload)
  ),
  [actionTypes.EDITED_PASSWORD]: (state, { payload }) => (
    state.set('isEdited', payload)
  ),
}, initialState);
