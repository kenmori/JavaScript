import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import ActionTypes from '../constants/actionTypes';
import gon from "../utils/gon";

export default handleActions({
    [ActionTypes.FETCHED_OBJECTIVES]: (state, { payload }) => {
      return fromJS(payload.get('result'));
    },
    [ActionTypes.ADDED_OBJECTIVE]: (state, { payload }) => {
      const ownerId = gon.getIn(['loginUser', 'ownerId']);
      const objectiveId = payload.get('result').first();
      const objective = payload.getIn(['entities', 'objectives', objectiveId.toString()]);
      return ownerId === objective.get('ownerId') ? state.insert(0, objectiveId) : state;
    },
    [ActionTypes.REMOVED_OBJECTIVE]: (state, { payload }) => {
      return state.filter((objectiveId) => (objectiveId !== payload.id));
    },
  },
  fromJS([]),
);
