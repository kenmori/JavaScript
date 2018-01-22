import { createActions } from 'redux-actions';
import actionTypes from '../constants/actionTypes';

const actions = createActions({
  [actionTypes.SHOW_TOAST]: message => ({ message }),
  [actionTypes.CLEAR_TOAST]: () => { },
});

export default actions;
