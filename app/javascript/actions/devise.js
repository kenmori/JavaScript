import { createActions } from 'redux-actions';
import actionTypes from '../constants/actionTypes';

const actions = createActions({
  [actionTypes.SIGN_IN]: (email, password, rememberMe) => {
    return { params: {email, password, rememberMe}}
  },
  [actionTypes.SIGN_OUT]: () => {},
});

export default actions;
