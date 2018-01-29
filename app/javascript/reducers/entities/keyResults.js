import { Map } from 'immutable';
import { handleActions } from 'redux-actions';
import ActionTypes from '../../constants/actionTypes';

function merge(state, { payload }) {
  if (!payload.getIn(['entities', 'keyResults'])) return state;
  // normalizeした結果ではidがstringになっているためintへ変換する
  return state.merge(
    payload.getIn(['entities', 'keyResults'])
      .filter(keyResult => keyResult.get('isFull'))
      .mapKeys(key => parseInt(key))
  );
}

function updateProgressRate(state, { payload }) {
  const keyResults = payload.getIn(['entities', 'keyResults']);
  return state.map((keyResult, keyResultId) =>
    keyResult.update('progressRate', progressRate =>
      keyResults.getIn([`${keyResultId}`, 'progressRate']) || progressRate
    )
  );
}

export default handleActions({
    [ActionTypes.FETCHED_KEY_RESULTS]: merge,
    [ActionTypes.FETCHED_ALL_KEY_RESULTS]: merge,
    [ActionTypes.ADDED_KEY_RESULT]: (state, { payload }) => {
      state = updateProgressRate(state, { payload });
      return merge(state, { payload });
    },
    [ActionTypes.UPDATED_KEY_RESULT]: (state, { payload }) => {
      state = updateProgressRate(state, { payload });
      return merge(state, { payload });
    },
    [ActionTypes.REMOVED_KEY_RESULT]: (state, { payload }) => {
      state = updateProgressRate(state, { payload });
      const keyResultId = payload.get('result').first();
      return state.delete(keyResultId);
    },
    [ActionTypes.FETCHED_OBJECTIVE]: merge,
    [ActionTypes.FETCHED_OBJECTIVES]: merge,
    [ActionTypes.ADDED_OBJECTIVE]: merge,
    [ActionTypes.UPDATED_OBJECTIVE]: (state, { payload }) => {
      state = merge(state, { payload });

      const objectiveId = payload.get('result').first();
      const objective = payload.getIn(['entities', 'objectives', `${objectiveId}`]);
      const oldParentKeyResultId = payload.getIn(['args', 'oldParentKeyResultId']);
      if (oldParentKeyResultId !== objective.get('parentKeyResultId')) {
        const oldParentKeyResult = state.get(oldParentKeyResultId);
        if (oldParentKeyResult) {
          state = state.set(oldParentKeyResultId,
            oldParentKeyResult
              .update('childObjectives', ids => ids && ids.filter(id => id !== objectiveId))
              .update('childObjectiveIds', ids => ids.filter(id => id !== objectiveId)));
        }
      }
      return state;
    }
  }, Map()
)
