import { createActions } from 'redux-actions';
import actionTypes from '../constants/actionTypes';
import { normalizeKeyResult, normalizeKeyResults } from '../schemas/index'

const actions = createActions({
  [actionTypes.FETCH_KEY_RESULTS]: (okrPeriodId, userId) => ({ okrPeriodId, userId }),
  [actionTypes.FETCHED_KEY_RESULTS]: keyResults => normalizeKeyResults(keyResults),
  [actionTypes.FETCH_ALL_KEY_RESULTS]: okrPeriodId => ({ okrPeriodId }),
  [actionTypes.FETCHED_ALL_KEY_RESULTS]: keyResults => normalizeKeyResults(keyResults),
  [actionTypes.ADD_KEY_RESULT]: keyResult => ({ keyResult }),
  [actionTypes.ADDED_KEY_RESULT]: (keyResult, currentUserId) => normalizeKeyResult(keyResult).set('currentUserId', currentUserId),
  [actionTypes.UPDATE_KEY_RESULT]: keyResult => ({ keyResult }),
  [actionTypes.UPDATED_KEY_RESULT]: (keyResult, currentUserId) => normalizeKeyResult(keyResult).set('currentUserId', currentUserId),
  [actionTypes.REMOVE_KEY_RESULT]: id => ({ id }),
  [actionTypes.REMOVED_KEY_RESULT]: keyResult => normalizeKeyResult(keyResult),
});

export default actions;
