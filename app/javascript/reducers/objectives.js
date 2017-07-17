import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import ActionTypes from '../constants/actionTypes';

export default handleActions({
    [ActionTypes.FETCHED_OBJECTIVES]: (state, { payload }) => {
      return state.merge(payload.objectives);
    },
    [ActionTypes.ADDED_OBJECTIVE]: (state, { payload }) => (
      state.push(payload.objective)
    ),
    [ActionTypes.UPDATED_OBJECTIVE]: (state, { payload }) => {
      return state.set(state.findIndex((objective) => {
        return objective.get('id') === payload.objective.get('id');
      }), payload.objective);
    },
    [ActionTypes.REMOVED_OBJECTIVE]: (state, { payload }) => {
      return state.filter((objective) => {
        return objective.get('id') !== payload.id;
      });
    },
  },
  fromJS([])
);
