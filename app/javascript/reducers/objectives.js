import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import ActionTypes from '../constants/actionTypes';

function add(state, objectiveId) {
  return state.update('ids', ids => ids.includes(objectiveId) ? ids : ids.insert(0, objectiveId));
}

function remove(state, objectiveId) {
  return state.update('ids', ids => ids.filter(id => id !== objectiveId));
}

function addToAll(state, objectiveId) {
  return state.update('allIds', ids => ids.insert(0, objectiveId));
}

function removeFromAll(state, objectiveId) {
  return state.update('allIds', ids => ids.filter(id => id !== objectiveId));
}

export default handleActions({
    [ActionTypes.FETCH_OBJECTIVE]: (state, { payload }) => {
      return state.set('isFetchingObjective', true);
    },
    [ActionTypes.FETCHED_OBJECTIVE]: (state, { payload }) => {
      const objectiveId = payload.get('result').first();
      return addToAll(state, objectiveId).set('fetchedObjective', objectiveId).set('isFetchingObjective', false);
    },
    [ActionTypes.FETCHED_OBJECTIVE_ERROR]: (state, { payload }) => {
      return state.set('fetchedObjective', -1).set('isFetchingObjective', false);
    },
    [ActionTypes.FETCH_OBJECTIVES]: (state, { payload }) => {
      return state.set('isFetched', false).set('isFetching', true);
    },
    [ActionTypes.FETCHED_OBJECTIVES]: (state, { payload }) => {
      return state.set('allIds', payload.get('result'))
              .set('ids', payload.get('result'))
              .set('isFetched', true)
              .set('isFetching', false);
    },
    [ActionTypes.ADDED_OBJECTIVE]: (state, { payload }) => {
      const userId = payload.get('currentUserId');
      const objectiveId = payload.get('result').first();
      const objective = payload.getIn(['entities', 'objectives', `${objectiveId}`]);
      const isMine = userId === objective.get('owner').get('id');
      state = addToAll(state, objectiveId)
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
      state = removeFromAll(state, payload.id);
      return remove(state, payload.id);
    },
  },
  fromJS({
    ids: [],
    allIds: [],
    fetchedObjective: null,
    isFetched: false,
    isFetchingObjective: false,
  }),
);
