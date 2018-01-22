import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import ActionTypes from '../constants/actionTypes';

const initialState = fromJS({
  open: false,
  content: '',
  onCancel: () => {},
  onConfirm: () => {},
});

export default handleActions({
  [ActionTypes.OPEN_CONFIRM]: (state, { payload }) => {
    return state.merge(payload.confirmParams).merge({open: true})
  },
  [ActionTypes.CLOSE_CONFIRM]: (state, { payload }) => {
    return state.merge({open: false})
  },
}, initialState);
