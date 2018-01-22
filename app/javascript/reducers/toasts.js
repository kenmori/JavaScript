import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import ActionTypes from '../constants/actionTypes';

export default handleActions({
    [ActionTypes.SHOW_TOAST]: (state, { payload }) => {
      return state.set('message', payload.message);
    },
    [ActionTypes.CLEAR_TOAST]: (state, { payload }) => {
      return state.set('message', null);
    },
  },
  fromJS({
    message: null
  })
);
