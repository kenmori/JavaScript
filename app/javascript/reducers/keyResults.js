import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import ActionTypes from '../constants/actionTypes';

function add(state, keyResultId) {
  return state.update('ids', ids => ids.includes(keyResultId) ? ids : ids.insert(0, keyResultId));
}

function remove(state, keyResultId) {
  return state.update('ids', ids => ids.filter(id => id !== keyResultId));
}

function addToAll(state, keyResultId) {
  return state.update('allIds', ids => ids.insert(0, keyResultId));
}

function removeFromAll(state, keyResultId) {
  return state.update('allIds', ids => ids.filter(id => id !== keyResultId));
}

export default handleActions({
    [ActionTypes.FETCH_KEY_RESULTS]: (state, { payload }) => {
      return state.set('isFetchedKeyResults', false);
    },
    [ActionTypes.FETCHED_KEY_RESULTS]: (state, { payload }) => {
      return state.set('ids', payload.get('result')).set('isFetchedKeyResults', true);
    },
    [ActionTypes.FETCH_ALL_KEY_RESULTS]: (state, { payload }) => {
      return state.set('isFetchedAllKeyResults', false);
    },
    [ActionTypes.FETCHED_ALL_KEY_RESULTS]: (state, { payload }) => {
      return state.set('allIds', payload.get('result')).set('isFetchedAllKeyResults', true);
    },
    [ActionTypes.ADDED_KEY_RESULT]: (state, { payload }) => {
      const keyResultId = payload.get('result').first();
      state = addToAll(state, keyResultId);

      const userId = payload.get('currentUserId');
      const keyResult = payload.getIn(['entities', 'keyResults', `${keyResultId}`]);
      const isMine = userId === keyResult.get('owner').get('id')
        || keyResult.get('keyResultMembers').some(member => member.get('id') === userId);
      return isMine ? add(state, keyResultId) : state;
    },
    [ActionTypes.UPDATED_KEY_RESULT]: (state, { payload }) => {
      const userId = payload.get('currentUserId');
      const keyResultId = payload.get('result').first();
      const keyResult = payload.getIn(['entities', 'keyResults', `${keyResultId}`]);
      const isMine = userId === keyResult.get('owner').get('id')
        || keyResult.get('keyResultMembers').some(member => member.get('id') === userId);
      return isMine ? add(state, keyResultId) : remove(state, keyResultId);
    },
    [ActionTypes.REMOVED_KEY_RESULT]: (state, { payload }) => {
      const keyResultId = payload.get('result').first();
      state = removeFromAll(state, keyResultId);
      return remove(state, keyResultId);
    },
  },
  fromJS({
    ids: [],
    allIds: [],
    isFetchedKeyResults: false,
    isFetchedAllKeyResults: false,
  }),
);
