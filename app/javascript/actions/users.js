import { createActions } from 'redux-actions';
import actionTypes from '../constants/actionTypes';

const actions = createActions({
  [actionTypes.FETCH_USERS]: () => {},
  [actionTypes.FETCHED_USERS]: users => ({ users }),
  [actionTypes.ADD_USER]: user => ({ user }),
  [actionTypes.ADDED_USER]: user => ({ user }),
  [actionTypes.UPDATE_USER]: user => ({ user }),
  [actionTypes.UPDATED_USER]: user => ({ user }),
  [actionTypes.REMOVE_USER]: id => ({ id }),
  [actionTypes.REMOVED_USER]: id => ({ id }),
});

export default actions;