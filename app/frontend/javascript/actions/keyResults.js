import { createActions } from 'redux-actions'
import actionTypes from '../constants/actionTypes'
import { normalizeKeyResult, normalizeKeyResults } from '../schemas/index'

const actions = createActions({
  [actionTypes.FETCH_KEY_RESULTS]: (okrPeriodId, userId) => ({
    okrPeriodId,
    userId,
  }),
  [actionTypes.FETCHED_KEY_RESULTS]: keyResults => normalizeKeyResults(keyResults),
  [actionTypes.FETCH_KEY_RESULT_CANDIDATES]: (okrPeriodId, userId) => ({
    okrPeriodId,
    userId,
  }),
  [actionTypes.FETCHED_KEY_RESULT_CANDIDATES]: keyResults => normalizeKeyResults(keyResults),
  [actionTypes.FETCH_TASK_KEY_RESULTS]: (okrPeriodId, userId) => ({
    okrPeriodId,
    userId,
  }),
  [actionTypes.FETCH_KEY_RESULT_COMMENT_LABELS]: () => ({}),
  [actionTypes.FETCHED_KEY_RESULT_COMMENT_LABELS]: labels => ({ labels }),
  [actionTypes.FETCHED_TASK_KEY_RESULTS]: keyResults => normalizeKeyResults(keyResults),
  [actionTypes.ADD_KEY_RESULT]: keyResult => ({ keyResult }),
  [actionTypes.ADDED_KEY_RESULT]: (keyResult, currentUserId) => normalizeKeyResult(keyResult).set('currentUserId', currentUserId),
  [actionTypes.UPDATE_KEY_RESULT]: keyResult => ({ keyResult }),
  [actionTypes.UPDATED_KEY_RESULT]: (keyResult, currentUserId) => normalizeKeyResult(keyResult).set('currentUserId', currentUserId),
  [actionTypes.REMOVE_KEY_RESULT]: id => ({ id }),
  [actionTypes.REMOVED_KEY_RESULT]: keyResult => normalizeKeyResult(keyResult),
  [actionTypes.REMOVED_KEY_RESULT_MEMBER]: (keyResultId, removedMemberId) => ({
    keyResultId,
    removedMemberId,
  }),
  [actionTypes.DISABLE_KEY_RESULT]: (id, toDisable) => ({ id, toDisable }),
  [actionTypes.DISABLED_KEY_RESULT]: keyResult => normalizeKeyResult(keyResult),
  [actionTypes.PROCESS_KEY_RESULT]: id => ({ id }),
  [actionTypes.PROCESSED_KEY_RESULT]: id => ({ id }),
})

export default actions
