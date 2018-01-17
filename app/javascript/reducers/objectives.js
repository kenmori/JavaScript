import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import ActionTypes from '../constants/actionTypes';

function add(state, objectiveId) {
  return state.update('ids', ids => ids.includes(objectiveId) ? ids : ids.insert(0, objectiveId));
}

function remove(state, objectiveId) {
  return state.update('ids', ids => ids.filter(id => id !== objectiveId));
}

export default handleActions({
    [ActionTypes.FETCH_OBJECTIVE]: (state, { payload }) => {
      return state.set('isFetched', false);
    },
    [ActionTypes.FETCHED_OBJECTIVE]: (state, { payload }) => {
      const objectiveId = payload.get('result').first();
      return state.set('fetchedObjective', objectiveId).set('isFetched', true);
    },
    [ActionTypes.FETCH_OBJECTIVES]: (state, { payload }) => {
      return state.set('isFetched', false);
    },
    [ActionTypes.FETCHED_OBJECTIVES]: (state, { payload }) => {
      return state.set('ids', payload.get('result')).set('isFetched', true);
    },
    [ActionTypes.ADDED_OBJECTIVE]: (state, { payload }) => {
      const userId = payload.get('currentUserId');
      const objectiveId = payload.get('result').first();
      const objective = payload.getIn(['entities', 'objectives', `${objectiveId}`]);
      const isMine = userId === objective.get('owner').get('id');
      return isMine ? add(state, objectiveId) : state;
    },
    [ActionTypes.UPDATED_OBJECTIVE]: (state, { payload }) => {
      const userId = payload.get('currentUserId');
      const objectiveId = payload.get('result').first();
      const objective = payload.getIn(['entities', 'objectives', `${objectiveId}`]);
      const isMine = userId === objective.get('owner').get('id');
      return isMine ? add(state, objectiveId) : remove(state, objectiveId);
    },
    [ActionTypes.REMOVED_OBJECTIVE]: (state, { payload }) => {
      return remove(state, payload.id);
    },
  },
  fromJS({
    ids: [],
    fetchedObjective: null,
    isFetched: false,
  }),
);
