import { createActions } from 'redux-actions';
import actionTypes from '../constants/actionTypes';

const actions = createActions({
  [actionTypes.SHOW_TOAST]: (message, type = null) => ({ message, type }),
  [actionTypes.CLEAR_TOAST]: () => { },
});

export default actions;
