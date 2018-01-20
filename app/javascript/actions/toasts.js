import { createActions } from 'redux-actions';
import actionTypes from '../constants/actionTypes';

const actions = createActions({
  [actionTypes.SHOW_SUCCESS_MESSAGE]: (message) => ({ message }),
  [actionTypes.CLEAR_SUCCESS_MESSAGE]: () => ({}),
});

export default actions;
