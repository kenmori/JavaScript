import { createActions } from 'redux-actions';
import ActionTypes from '../constants/actionTypes';

const actions = createActions({
  [ActionTypes.UPDATE_OBJECTIVE_ORDER]: list => ({ list }),
  [ActionTypes.UPDATED_OBJECTIVE_ORDER]: list => ({ list }),
});

export default actions;
