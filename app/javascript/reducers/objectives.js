import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import ActionTypes from '../constants/actionTypes';

export default handleActions({
    [ActionTypes.FETCHED_OBJECTIVES]: (state, { payload }) => {
      return state.merge(payload.objectives);
    },
    [ActionTypes.ADDED_OBJECTIVE]: (state, { payload }) => (
      state.insert(0, payload.objective)
    ),
    [ActionTypes.UPDATED_OBJECTIVE]: (state, { payload }) => {
      return state.set(state.findIndex((objective) => {
        return objective.get('id') === payload.objective.get('id');
      }), payload.objective);
    },
    [ActionTypes.REMOVED_OBJECTIVE]: (state, { payload }) => {
      return state.filter((objective) => {
        return objective.get('id') !== payload.id;
      }).map((objective) => {
        return objective.set('childObjectives', objective.get('childObjectives').filter((childObjective) => {
          return childObjective.get('id') !== payload.id;
        }));
      });
    },
    [ActionTypes.UPDATED_KEY_RESULT]: (state, { payload }) => {
      const newState = state.map(objective => {
        if (objective.get('id') === payload.keyResult.get('objectiveId')) {
          const newKeyResults = objective.get('keyResults').map((keyResult => {
            if (keyResult.get('id') === payload.keyResult.get('id')) {
              return payload.keyResult
            }
            return keyResult
          }));
          objective = objective.set('keyResults', newKeyResults)
        }

        return objective
      })
      return newState
    }
  },
  fromJS([]),
);
