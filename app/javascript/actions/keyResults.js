import { createActions } from 'redux-actions';
import actionTypes from '../constants/actionTypes';
import { normalize } from 'normalizr';
import { fromJS } from 'immutable';
import { keyResultListSchema } from '../schemas/index'

function normalizeKeyResults(keyResults) {
  const normalized = normalize(keyResults, keyResultListSchema);
  return fromJS(normalized)
}

const actions = createActions({
  [actionTypes.FETCH_KEY_RESULTS]: (userId) => ({ userId }),
  [actionTypes.FETCHED_KEY_RESULTS]: (keyResults) => (normalizeKeyResults(keyResults.toJSON())),
  [actionTypes.ADD_KEY_RESULT]: keyResult => (keyResult),
  [actionTypes.ADDED_KEY_RESULT]: keyResult => (normalizeKeyResults([keyResult.toJSON()])),
  [actionTypes.UPDATE_KEY_RESULT]: keyResult => (keyResult),
  [actionTypes.UPDATED_KEY_RESULT]: keyResult => (normalizeKeyResults([keyResult.toJSON()])),
  [actionTypes.REMOVE_KEY_RESULT]: keyResult => (keyResult),
  [actionTypes.REMOVED_KEY_RESULT]: keyResult => (keyResult),
});

export default actions;
