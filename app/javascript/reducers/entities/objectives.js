import { Map, fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import ActionTypes from '../../constants/actionTypes';

function merge(state, { payload }) {
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
    [ActionTypes.ADDED_OBJECTIVE]: merge,
    [ActionTypes.UPDATED_OBJECTIVE]: merge,
    [ActionTypes.REMOVED_OBJECTIVE]: (state, { payload }) => {
      return state.delete(payload.id).map((objective) => {
        return objective.set('childObjectives', objective.get('childObjectives').delete(payload.id));
      });
    },
    [ActionTypes.ADDED_KEY_RESULT]: (state, { payload }) => {
      const keyResult = payload.get('keyResult');1
      return state.update(keyResult.get('objectiveId'), (objective) => {
        return objective.update('keyResults', (keyResultIds) => keyResultIds.push(keyResult.get('id')));
      });
    },
    [ActionTypes.REMOVED_KEY_RESULT]: (state, { payload }) => {
      const keyResult = payload.get('keyResult');
      return state.update(keyResult.get('objectiveId'), (objective) => (objective.get('keyResults').delete(keyResult.get('id'))));
    },
    [ActionTypes.UPDATED_KEY_RESULT]: (state, { payload }) => {
      const keyResult = payload.get('keyResult');
      return state.update(keyResult.get('objectiveId'), (objective) => (objective.get('keyResults').set(keyResult.get('id'), keyResult)));
    }
  },
  Map()
);
