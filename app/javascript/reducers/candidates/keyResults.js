import { Map } from 'immutable';
import { handleActions } from 'redux-actions';
import ActionTypes from '../../constants/actionTypes';

function merge(state, { payload }) {
  const keyResults = payload.getIn(['entities', 'keyResults']);
  if (!keyResults) return state;
  return state.mergeWith(
    (oldVal, newVal) => oldVal.merge(newVal),
    keyResults
      .mapKeys(key => parseInt(key)) // normalize により id が string になるため int へ変換する
  );
}

function remove(state, keyResultId) {
  return state.delete(keyResultId)
}

export default handleActions({
    [ActionTypes.FETCHED_KEY_RESULT_CANDIDATES]: merge,
    [ActionTypes.ADDED_KEY_RESULT]: merge,
    [ActionTypes.UPDATED_KEY_RESULT]: merge,
    [ActionTypes.REMOVED_KEY_RESULT]: (state, { payload }) => {
      state = merge(state, { payload });
      const keyResultId = payload.get('result').first();
      return remove(state, keyResultId);
    },
    [ActionTypes.REMOVED_OBJECTIVE_KEY_RESULTS]: (state, { payload }) => {
      const { keyResultIds } = payload
      keyResultIds.forEach(keyResultId => state = remove(state, keyResultId))
      return state
    },
    [ActionTypes.DISABLED_KEY_RESULT]: merge,
  },
  Map(),
);
