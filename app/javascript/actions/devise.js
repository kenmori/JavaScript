import { createActions } from 'redux-actions';
import actionTypes from '../constants/actionTypes';

const actions = createActions({
  [actionTypes.SIGN_IN]: (email, password, rememberMe) => {
    return { params: {email, password, rememberMe}}
  },
  [actionTypes.SIGN_OUT]: () => {},
  [actionTypes.RESET_PASSWORD]: user => ({ user }),
  [actionTypes.RESET_PASSWORD_COMPLETED]: () => (true),
  [actionTypes.EDIT_PASSWORD]: user => ({ user }),
  [actionTypes.SET_PASSWORD]: user => ({ user }),
});

export default actions;
