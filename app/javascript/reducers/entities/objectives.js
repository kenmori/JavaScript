import { Map } from 'immutable';
import { handleActions } from 'redux-actions';
import ActionTypes from '../../constants/actionTypes';

function merge(state, { payload }) {
  const objectives = payload.getIn(['entities', 'objectives']);
  if (!objectives) return state;
  return state.mergeWith(
    (oldVal, newVal) => oldVal.merge(newVal),
    objectives
      .filter(objective => objective.get('isFull') || state.has(objective.get('id')))
      .mapKeys(key => parseInt(key)) // normalize により id が string になるため int へ変換する
  );
}

function resetParentKeyResult(state, removedKeyResultId) {
  // 上位 KR = 削除した KR な下位 O がある場合は上位 KR を null にリセットする (孤立 O になる) 
  const childObjectives = state.filter(objective => objective.get('parentKeyResultId') === removedKeyResultId)
  return childObjectives.isEmpty() ? state
    : state.merge(childObjectives.map(objective => objective.set('parentKeyResultId', null)))
}

export default handleActions({
    [ActionTypes.FETCHED_OBJECTIVE]: merge,
    [ActionTypes.FETCHED_OBJECTIVES]: merge,
    [ActionTypes.FETCHED_PREVIOUS_OBJECTIVES]: merge,
    [ActionTypes.ADDED_OBJECTIVE]: merge,
    [ActionTypes.UPDATED_OBJECTIVE]: merge,
    [ActionTypes.REMOVED_OBJECTIVE]: (state, { payload }) => {
      state = merge(state, { payload });
      const objectiveId = payload.get('result').first();
      return state.delete(objectiveId);
    },
    [ActionTypes.ADDED_KEY_RESULT]: merge,
    [ActionTypes.UPDATED_KEY_RESULT]: merge,
    [ActionTypes.REMOVED_KEY_RESULT]: (state, { payload }) => {
      state = merge(state, { payload })
      const keyResultId = payload.get('result').first()
      return resetParentKeyResult(state, keyResultId)
    },
    [ActionTypes.REMOVED_KEY_RESULT_IDS]: (state, { payload }) => {
      const { keyResultIds } = payload
      keyResultIds.forEach(keyResultId => state = resetParentKeyResult(state, keyResultId))
      return state
    },
  },
  Map()
);
