import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import ActionTypes from '../constants/actionTypes';

function add(state, keyResultId) {
  return state.update('ids', ids => ids.includes(keyResultId) ? ids : ids.insert(0, keyResultId));
}

function remove(state, keyResultId) {
  return state.update('ids', ids => ids.filter(id => id !== keyResultId));
}

function addToCandidates(state, keyResultId) {
  return state.update('candidateIds', ids => ids.insert(0, keyResultId));
}

function removeFromCandidates(state, keyResultId) {
  return state.update('candidateIds', ids => ids.filter(id => id !== keyResultId));
}

export default handleActions({
    [ActionTypes.FETCH_KEY_RESULTS]: (state, { payload }) => {
      return state.set('isFetchedKeyResults', false);
    },
    [ActionTypes.FETCHED_KEY_RESULTS]: (state, { payload }) => {
      return state.set('ids', payload.get('result')).set('isFetchedKeyResults', true);
    },
    [ActionTypes.FETCH_KEY_RESULT_CANDIDATES]: state => {
      return state.set('isFetchedCandidates', false);
    },
    [ActionTypes.FETCHED_KEY_RESULT_CANDIDATES]: (state, { payload }) => {
      return state.set('candidateIds', payload.get('result')).set('isFetchedCandidates', true);
    },
    [ActionTypes.FETCHED_KEY_RESULT_TASKS]: (state, { payload }) => {
      return state.set('taskIds', payload.get('result'))
    },
    [ActionTypes.ADDED_KEY_RESULT]: (state, { payload }) => {
      const keyResultId = payload.get('result').first();
      state = addToCandidates(state, keyResultId);

      const userId = payload.get('currentUserId');
      const keyResult = payload.getIn(['entities', 'keyResults', `${keyResultId}`]);
      const isMine = userId === keyResult.get('owner').get('id')
        || keyResult.get('members').some(member => member.get('id') === userId);
      return isMine ? add(state, keyResultId) : state;
    },
    [ActionTypes.UPDATED_KEY_RESULT]: (state, { payload }) => {
      const userId = payload.get('currentUserId');
      const keyResultId = payload.get('result').first();
      const keyResult = payload.getIn(['entities', 'keyResults', `${keyResultId}`]);
      const isMine = userId === keyResult.get('owner').get('id')
        || keyResult.get('members').some(member => member.get('id') === userId);
      return isMine ? add(state, keyResultId) : remove(state, keyResultId);
    },
    [ActionTypes.REMOVED_KEY_RESULT]: (state, { payload }) => {
      const keyResultId = payload.get('result').first();
      state = removeFromCandidates(state, keyResultId);
      return remove(state, keyResultId);
    },
  },
  fromJS({
    ids: [],
    candidateIds: [],
    taskIds: [],
    isFetchedKeyResults: false,
    isFetchedCandidates: false,
  }),
);
