import { Map } from 'immutable';
import { handleActions } from 'redux-actions';
import ActionTypes from '../../constants/actionTypes';

function merge(state, { payload }) {
  if (!payload.getIn(['entities', 'objectives'])) return state;
  // normalizeした結果ではidがstringになっているためintへ変換する
  return state.merge(
    payload.getIn(['entities', 'objectives'])
      .filter(objective => objective.get('isFull'))
      .mapKeys(key => parseInt(key))
  );
}

function updateProgressRate(state, { payload }) {
  const objectives = payload.getIn(['entities', 'objectives']);
  return state.map((objective, objectiveId) =>
    objective.update('progressRate', progressRate =>
      objectives.getIn([`${objectiveId}`, 'progressRate']) || progressRate
    )
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
              .update('childObjectives', ids => ids && ids.filter(id => id !== objectiveId))
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
    [ActionTypes.ADDED_KEY_RESULT]: (state, { payload }) => {
      state = updateProgressRate(state, { payload });
      const keyResultId = payload.get('result').first();
      const keyResult = payload.getIn(['entities', 'keyResults', `${keyResultId}`]);
      const objectiveId = keyResult.get('objectiveId');
      return state.updateIn([objectiveId, 'keyResults'], ids => ids.push(keyResultId));
    },
    [ActionTypes.UPDATED_KEY_RESULT]: (state, { payload }) => {
      state = updateProgressRate(state, { payload });
      const keyResultId = payload.get('result').first();
      const keyResult = payload.getIn(['entities', 'keyResults', `${keyResultId}`]);
      const objectiveId = keyResult.get('objectiveId');
      const newObjective = payload.getIn(['entities', 'objectives', `${objectiveId}`]);
      return state.update(objectiveId, oldObjective => oldObjective.merge(newObjective));
    },
    [ActionTypes.REMOVED_KEY_RESULT]: (state, { payload }) => {
      state = updateProgressRate(state, { payload });
      state = merge(state, { payload });
      const keyResultId = payload.get('result').first();
      const keyResult = payload.getIn(['entities', 'keyResults', `${keyResultId}`]);
      const objectiveId = keyResult.get('objectiveId');
      return state.updateIn([objectiveId, 'keyResults'], ids => ids.filter(id => id !== keyResultId));
    },
  },
  Map()
);
