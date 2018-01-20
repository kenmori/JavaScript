import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import ActionTypes from '../constants/actionTypes';

export default handleActions({
    [ActionTypes.SHOW_SUCCESS_MESSAGE]: (state, { payload }) => {
      return state.set('successMessage', payload.message)
    },
    [ActionTypes.CLEAR_SUCCESS_MESSAGE]: (state) => (
      state.set('successMessage', null)
    ),
  },
  fromJS({
    successMessage: null
  })
);
