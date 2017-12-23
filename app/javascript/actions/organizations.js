import { createActions } from 'redux-actions';
import actionTypes from '../constants/actionTypes';

const actions = createActions({
  [actionTypes.UPDATE_LOGO]: organization => ({ organization }),
  [actionTypes.UPDATED_LOGO]: organization => ({ organization }),
});

export default actions;
