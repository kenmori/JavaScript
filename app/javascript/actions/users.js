import { createActions } from 'redux-actions';
import actionTypes from '../constants/actionTypes';

const actions = createActions({
  [actionTypes.ADD_USER]: user => ({ user }),
  [actionTypes.ADDED_USER]: user => ({ user }),
  [actionTypes.UPDATE_USER]: user => ({ user }),
  [actionTypes.UPDATED_USER]: user => ({ user }),
  [actionTypes.DISABLE_USER]: (id, toDisable) => ({ id, toDisable }),
  [actionTypes.DISABLED_USER]: user => ({ user }),
  [actionTypes.UPDATE_PASSWORD]: user => ({ user }),
  [actionTypes.RESEND_EMAIL]: id => ({ id }),
});

export default actions;
