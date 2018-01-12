import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import ActionTypes from '../constants/actionTypes';
import gon from "../utils/gon";

export default handleActions({
    [ActionTypes.FETCH_OBJECTIVES]: (state, { payload }) => {
      return state.set('isFetched', false);
    },
    [ActionTypes.FETCHED_OBJECTIVES]: (state, { payload }) => {
      return fromJS({
        items: payload.get('result'),
        isFetched: true,
      });
    },
    [ActionTypes.ADDED_OBJECTIVE]: (state, { payload }) => {
      const userId = gon.getIn(['loginUser', 'id']);
      const objectiveId = payload.get('result').first();
      const objective = payload.getIn(['entities', 'objectives', objectiveId.toString()]);
      return userId === objective.get('owner').get('id') ? state.set('items', state.get('items').insert(0, objectiveId)) : state;
    },
    [ActionTypes.REMOVED_OBJECTIVE]: (state, { payload }) => {
      return state.set('items', state.get('items').filter((objectiveId) => (objectiveId !== payload.id)));
    },
  },
  fromJS({
    items: [],
    isFetched: false,
  }),
);
