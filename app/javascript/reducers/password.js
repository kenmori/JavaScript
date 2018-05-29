import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import actionTypes from '../constants/actionTypes';

const initialState = fromJS({
  isRecovered: false,
  isEdited: false,
});

export default handleActions({
  [actionTypes.RECOVERED_PASSWORD]: (state, { payload }) => (
    state.set('isRecovered', payload)
  ),
  [actionTypes.EDITED_PASSWORD]: (state, { payload }) => (
    state.set('isEdited', payload)
  ),
}, initialState);
