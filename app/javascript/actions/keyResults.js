import { createActions } from 'redux-actions';
import actionTypes from '../constants/actionTypes';
import { normalize } from 'normalizr';
import { fromJS } from 'immutable';
import { keyResultListSchema } from '../schemas/index'

function normalizeKeyResults(keyResults, currentUserId) {
  const normalized = normalize(keyResults, keyResultListSchema);
  if (currentUserId) {
    normalized.currentUserId = currentUserId;
  }
  return fromJS(normalized)
}

const actions = createActions({
  [actionTypes.FETCH_KEY_RESULTS]: (okrPeriodId, userId) => ({ okrPeriodId, userId }),
  [actionTypes.FETCHED_KEY_RESULTS]: (keyResults) => normalizeKeyResults(keyResults.toJSON()),
  [actionTypes.ADD_KEY_RESULT]: (keyResult, currentUserId) => ({ keyResult, currentUserId }),
  [actionTypes.ADDED_KEY_RESULT]: (keyResult, currentUserId) => normalizeKeyResults([keyResult.toJSON()], currentUserId),
  [actionTypes.UPDATE_KEY_RESULT]: (keyResult, currentUserId) => ({ keyResult, currentUserId }),
  [actionTypes.UPDATED_KEY_RESULT]: (keyResult, currentUserId) => normalizeKeyResults([keyResult.toJSON()], currentUserId),
  [actionTypes.REMOVE_KEY_RESULT]: id => (id),
  [actionTypes.REMOVED_KEY_RESULT]: keyResult => normalizeKeyResults([keyResult.toJSON()]),
});

export default actions;
