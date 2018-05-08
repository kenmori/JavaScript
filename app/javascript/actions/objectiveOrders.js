import { createActions } from 'redux-actions';
import ActionTypes from '../constants/actionTypes';

const actions = createActions({
  [ActionTypes.UPDATE_OBJECTIVE_ORDER]: order => ({ order }),
  [ActionTypes.UPDATED_OBJECTIVE_ORDER]: order => ({ order }),
});

export default actions;
