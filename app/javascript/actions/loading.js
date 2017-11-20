import { createActions } from 'redux-actions';
import actionTypes from '../constants/actionTypes';

const actions = createActions({
  [actionTypes.OPEN_LOADING]: () => {},
  [actionTypes.CLOSE_LOADING]: () => {},
});

export default actions;
