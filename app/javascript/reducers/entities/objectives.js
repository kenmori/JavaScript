import { Map, fromJS } from 'immutable';
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
    [ActionTypes.ADDED_OBJECTIVE]: (state, { payload }) => {
      const objectiveId = payload.get('result').first();
      const objective = payload.getIn(['entities', 'objectives', objectiveId.toString()]);
      const newObjectives = state.set(objectiveId, objective);
      const parentObjectiveId = objective.get('parentObjectiveId');
      if (parentObjectiveId) {
        return newObjectives.updateIn([parentObjectiveId, 'childObjectiveIds'], (childObjectiveIds) => (childObjectiveIds.push(objectiveId)));
      } else {
        return newObjectives;
      }
    },
    [ActionTypes.UPDATED_OBJECTIVE]: merge,
    [ActionTypes.REMOVED_OBJECTIVE]: (state, { payload }) => {
      return state.delete(payload.id).map((objective) => {
        return objective.update('childObjectiveIds', (childObjectiveIds) => childObjectiveIds.filter((childObjectiveId) => (childObjectiveId !== payload.id)));
      });
    },
    [ActionTypes.ADDED_KEY_RESULT]: (state, { payload }) => {
      state = updateProgressRate(state, { payload });
      const keyResultId = payload.get('result').first();
      const keyResult = payload.getIn(['entities', 'keyResults', keyResultId.toString()]);
      const objectiveId = keyResult.get('objectiveId');
      return state.updateIn([objectiveId, 'keyResults'], ids => ids.push(keyResultId));
    },
    [ActionTypes.UPDATED_KEY_RESULT]: updateProgressRate,
    [ActionTypes.REMOVED_KEY_RESULT]: (state, { payload }) => {
      state = updateProgressRate(state, { payload });
      const keyResultId = payload.get('result').first();
      const keyResult = payload.getIn(['entities', 'keyResults', keyResultId.toString()]);
      const objectiveId = keyResult.get('objectiveId');
      return state.updateIn([objectiveId, 'keyResults'], ids => ids.filter(id => id !== keyResultId));
    },
  },
  Map()
);
