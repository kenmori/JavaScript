import { createActions } from 'redux-actions';
import actionTypes from '../constants/actionTypes';

const actions = createActions({
  [actionTypes.ADD_KEY_RESULT]:  (objectiveId, name, isContinue) => ({ keyResult: { objectiveId, name }, isContinue }),
  [actionTypes.ADDED_KEY_RESULT]: keyResult => ({ keyResult }),
  [actionTypes.UPDATE_KEY_RESULT]: keyResult => ({ keyResult }),
  [actionTypes.UPDATED_KEY_RESULT]: keyResult => ({ keyResult }),
});

export default actions;
