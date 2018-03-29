import { Map } from 'immutable';
import { handleActions } from 'redux-actions';
import ActionTypes from '../../constants/actionTypes';

function merge(state, { payload }) {
  const objectives = payload.getIn(['entities', 'objectives']);
  if (!objectives) return state;
  return state.mergeWith(
    (oldVal, newVal) => oldVal.merge(newVal),
    objectives.mapKeys(key => parseInt(key)) // normalize により id が string になるため int へ変換する
  );
}

export default handleActions({
    [ActionTypes.FETCHED_OBJECTIVE]: merge,
    [ActionTypes.FETCHED_OBJECTIVES]: merge,
    [ActionTypes.ADDED_OBJECTIVE]: merge,
    [ActionTypes.UPDATED_OBJECTIVE]: (state, { payload }) => {
      state = merge(state, { payload });

      const objectiveId = payload.get('result').first();
      const objective = payload.getIn(['entities', 'objectives', `${objectiveId}`]);
      const oldParentObjectiveId = payload.getIn(['args', 'oldParentObjectiveId']);
      if (oldParentObjectiveId !== objective.get('parentObjectiveId')) {
        const oldParentObjective = state.get(oldParentObjectiveId);
        if (oldParentObjective) {
          state = state.set(oldParentObjectiveId,
            oldParentObjective
              .update('childObjectiveIds', ids => ids.filter(id => id !== objectiveId)));
        }
      }
      return state;
    },
    [ActionTypes.REMOVED_OBJECTIVE]: (state, { payload }) => {
      return state.delete(payload.id).map(objective =>
        objective.update('childObjectiveIds', ids => ids.filter(id => id !== payload.id))
      );
    },
    [ActionTypes.FETCHED_KEY_RESULT]: merge,
    [ActionTypes.ADDED_KEY_RESULT]: merge,
    [ActionTypes.UPDATED_KEY_RESULT]: merge,
    [ActionTypes.REMOVED_KEY_RESULT]: merge,
  },
  Map()
);
