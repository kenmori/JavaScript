import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import ActionTypes from '../constants/actionTypes';
import gon from '../utils/gon';


const keyResultMethod = {
  update: (keyResults, newKeyResult) => {
    return keyResults.map(keyResult => {
      if (keyResult.get('id') === newKeyResult.get('id')) {
        return newKeyResult;
      }
      return keyResult;
    });
  },
  remove: (keyResults, newKeyResult) => {
    return keyResults.filter(keyResult => keyResult.get('id') !== newKeyResult.get('id'));
  }
}

function rebuildKeyResult(method, state, payload) {
  return state.map(objective => {
    if (objective.get('id') === payload.keyResult.get('objectiveId')) {
      const newKeyResults = method(objective.get('keyResults'), payload.keyResult);
      objective = objective.set('keyResults', newKeyResults);
    }
    return objective;
  })
}

export default handleActions({
    [ActionTypes.FETCHED_OBJECTIVES]: (state, { payload }) => {
      return payload.objectives;
    },
    [ActionTypes.ADDED_OBJECTIVE]: (state, { payload }) => {
      const ownerId = gon.getIn(['loginUser', 'ownerId']);
      return ownerId === payload.objective.get('ownerId') ? state.insert(0, payload.objective) : state
    },
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
    [ActionTypes.REMOVED_KEY_RESULT]: (state, { payload }) => {
      return rebuildKeyResult(keyResultMethod.remove, state, payload);
    },
    [ActionTypes.UPDATED_KEY_RESULT]: (state, { payload }) => {
      return rebuildKeyResult(keyResultMethod.update, state, payload);
    }
  },
  fromJS([]),
);
