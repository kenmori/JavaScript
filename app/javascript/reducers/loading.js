import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import ActionTypes from '../constants/actionTypes';

const initialState = fromJS({
  isOpened: false
});

export default handleActions({
  [ActionTypes.OPEN_LOADING]: (state, { payload }) => (state.set('isOpened', true)),
  [ActionTypes.CLOSE_LOADING]: (state, { payload }) => (state.set('isOpened', false)),
}, initialState);
