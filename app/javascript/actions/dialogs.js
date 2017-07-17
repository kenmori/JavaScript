import { createActions } from 'redux-actions';
import actionTypes from '../constants/actionTypes';

const actions = createActions({
  [actionTypes.OPEN_KEY_RESULT_FORM_MODAL]: (objective) => ({ objective }),
  [actionTypes.CLOSE_KEY_RESULT_FORM_MODAL]: () => {},
  [actionTypes.OPEN_OBJECTIVE_FORM_MODAL]: () => {},
  [actionTypes.CLOSE_OBJECTIVE_FORM_MODAL]: () => {},
});

export default actions;
