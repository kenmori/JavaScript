import { createActions } from 'redux-actions';
import actionTypes from '../constants/actionTypes';

const actions = createActions({
  [actionTypes.ADD_USER]: user => ({ user }),
  [actionTypes.ADDED_USER]: user => ({ user }),
  [actionTypes.UPDATE_USER]: user => ({ user }),
  [actionTypes.UPDATED_USER]: user => ({ user }),
  [actionTypes.REMOVE_USER]: id => ({ id }),
  [actionTypes.REMOVED_USER]: user => ({ user }),
  [actionTypes.RESTORE_USER]: id => ({ id }),
  [actionTypes.RESTORED_USER]: user => ({ user }),
  [actionTypes.UPDATE_PASSWORD]: user => ({ user }),
  [actionTypes.UPDATED_PASSWORD]: user => ({ user }),
  [actionTypes.RECOVER_PASSWORD]: user => ({ user }),
  [actionTypes.RECOVERED_PASSWORD]: () => (true),
  [actionTypes.EDIT_PASSWORD]: (user) => ({ user }),
  [actionTypes.SET_PASSWORD]: user => ({ user }),
  [actionTypes.UPDATE_AVATAR]: user => ({ user }),
  [actionTypes.UPDATED_AVATAR]: user => ({ user }),
  [actionTypes.UPDATE_EMAIL]: user => ({ user }),
  [actionTypes.UPDATED_EMAIL]: user => ({ user }),
  [actionTypes.UPDATE_CURRENT_ORGANIZATION_ID]: user => ({ user }),
  [actionTypes.UPDATED_CURRENT_ORGANIZATION_ID]: user => ({ user }),
  [actionTypes.RESEND_EMAIL]: id => ({ id }),
});

export default actions;
