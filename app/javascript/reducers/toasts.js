import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import ActionTypes from '../constants/actionTypes';

export default handleActions({
    [ActionTypes.SHOW_TOAST]: (state, { payload }) => {
      return state.merge({ 'message': payload.message, 'type': payload.type, });
    },
    [ActionTypes.CLEAR_TOAST]: (state, { payload }) => {
      return state.merge({ 'message': null, 'type': null });
    },
  },
  fromJS({
    message: null,
    type: null,
  })
);
