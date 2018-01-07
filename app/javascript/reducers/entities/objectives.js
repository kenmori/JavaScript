import { Map, fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import ActionTypes from '../../constants/actionTypes';

function merge(state, { payload }) {
  if (!payload.getIn(['entities', 'objectives'])) return state;
  // normalizeした結果ではidがstringになっているためintへ変換する
  return state.merge(
    payload.getIn(['entities', 'objectives']).mapKeys((key) => (parseInt(key)))
      .map(
        (objective) => {
          return objective
            .update('keyResults', (keyResultIds) => (keyResultIds.map((keyResultId) => parseInt(keyResultId))))
            .update('childObjectives', (childObjectiveIds) => (childObjectiveIds.map((childObjectiveId) => (parseInt(childObjectiveId)))))
        }
      )
  );
}

export default handleActions({
    [ActionTypes.FETCHED_OBJECTIVES]: merge,
    [ActionTypes.ADDED_OBJECTIVE]: (state, { payload }) => {
      const objectiveId = payload.get('result').first();
      const objective = payload.getIn(['entities', 'objectives', objectiveId.toString()]);
      const newObjectives = state.set(objectiveId, objective);
      const parentObjectiveId = objective.get('parentObjectiveId');
      if (parentObjectiveId) {
        return newObjectives.updateIn([parentObjectiveId, 'childObjectives'], (childObjectiveIds) => (childObjectiveIds.push(objectiveId)));
      } else {
        return newObjectives;
      }
    },
    [ActionTypes.UPDATED_OBJECTIVE]: merge,
    [ActionTypes.REMOVED_OBJECTIVE]: (state, { payload }) => {
      return state.delete(payload.id).map((objective) => {
        return objective.update('childObjectives', (childObjectiveIds) => childObjectiveIds.filter((childObjectiveId) => (childObjectiveId !== payload.id)));
      });
    },
    [ActionTypes.ADDED_KEY_RESULT]: (state, { payload }) => {
      const keyResultId = payload.get('result').first();
      const keyResult = payload.getIn(['entities', 'keyResults', keyResultId.toString()]);
      return state.updateIn([keyResult.get('objectiveId'), 'keyResults'], (keyResultIds) => keyResultIds.push(keyResult.get('id')));
    },
    [ActionTypes.REMOVED_KEY_RESULT]: (state, { payload }) => {
      return state.updateIn([payload.get('objectiveId'), 'keyResults'], (keyResultIds) => (keyResultIds.filter((keyResultId) => keyResultId !== payload.get('id'))));
    },
  },
  Map()
);
