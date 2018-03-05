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
      return state.set('isFetchingObjective', true);
    },
    [ActionTypes.FETCHED_OBJECTIVE]: (state, { payload }) => {
      const objectiveId = payload.get('result').first();
      return add(state, objectiveId).set('fetchedObjective', objectiveId).set('isFetchingObjective', false);
    },
    [ActionTypes.FETCHED_OBJECTIVE_ERROR]: (state, { payload }) => {
      return state.set('fetchedObjective', -1).set('isFetchingObjective', false);
    },
    [ActionTypes.FETCH_OBJECTIVES]: (state, { payload }) => {
      return state.set('isFetched', false).set('isFetching', true);
    },
    [ActionTypes.FETCHED_OBJECTIVES]: (state, { payload }) => {
      return state.set('ids', payload.get('result')).set('isFetched', true).set('isFetching', false);
    },
    [ActionTypes.ADDED_OBJECTIVE]: (state, { payload }) => {
      const userId = payload.get('currentUserId');
      const objectiveId = payload.get('result').first();
      const objective = payload.getIn(['entities', 'objectives', `${objectiveId}`]);
      const isMine = userId === objective.get('owner').get('id');
      return isMine ? add(state, objectiveId) : state;
    },
    [ActionTypes.UPDATED_OBJECTIVE]: (state, { payload }) => {
      const userId = payload.getIn(['args', 'currentUserId']);
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
    isFetchingObjective: false,
  }),
);
