import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import ActionTypes from '../constants/actionTypes';

function add(state, keyResultId) {
  return state.update('ids', ids => ids.includes(keyResultId) ? ids : ids.insert(0, keyResultId))
}

function remove(state, keyResultId) {
  return state.update('ids', ids => ids.filter(id => id !== keyResultId))
}

function addToCandidates(state, keyResultId) {
  return state.update('candidateIds', ids => ids.insert(0, keyResultId));
}

function removeFromCandidates(state, keyResultId) {
  return state.update('candidateIds', ids => ids.filter(id => id !== keyResultId));
}

function addToUnprocessed(state, keyResultId, payload, orRemove = false) {
  const keyResult = payload.getIn(['entities', 'keyResults', `${keyResultId}`])
  if (keyResult.get('isProcessed')) {
    return orRemove ? removeFromUnprocessed(state, keyResultId) : state
  } else {
    return state.update('unprocessedIds', ids => ids.includes(keyResultId) ? ids : ids.insert(0, keyResultId))
  }
}

function removeFromUnprocessed(state, keyResultId) {
  return state.update('unprocessedIds', ids => ids.filter(id => id !== keyResultId))
}

function removeParentFromUnprocessed(state, payload) {
  const objectiveId = payload.get('result').first()
  const objective = payload.getIn(['entities', 'objectives', `${objectiveId}`])
  const parentKeyResultId = objective.get('parentKeyResultId')
  if (parentKeyResultId) {
    const parentKeyResult = payload.getIn(['entities', 'keyResults', `${parentKeyResultId}`])
    if (parentKeyResult.get('isProcessed')) {
      return removeFromUnprocessed(state, parentKeyResultId)
    }
  }
  return state
}

function addParentAndKeyResults(state, payload) {
  // 上位 KR 紐付け変更時や下位 OKR 作成時、OKR コピー時に Objective の上位 KR や紐付く KR を追加する
  const objectiveId = payload.get('result').first()
  const objective = payload.getIn(['entities', 'objectives', `${objectiveId}`])
  objective.get('keyResultIds')
    .push(objective.get('parentKeyResultId'))
    .forEach(keyResultId => {
      if (keyResultId && isMine(keyResultId, payload)) {
        state = add(state, keyResultId)
      }
    })
  return state
}

function isMine(keyResultId, payload) {
  const userId = payload.get('currentUserId')
  const keyResult = payload.getIn(['entities', 'keyResults', `${keyResultId}`])
  return userId === keyResult.get('owner').get('id')
    || keyResult.get('members').some(member => member.get('id') === userId)
}

export default handleActions({
    [ActionTypes.FETCH_KEY_RESULTS]: state => {
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
    [ActionTypes.FETCHED_UNPROCESSED_KEY_RESULTS]: (state, { payload }) => {
      return state.set('unprocessedIds', payload.get('result'))
    },
    [ActionTypes.ADDED_KEY_RESULT]: (state, { payload }) => {
      const keyResultId = payload.get('result').first();
      state = addToCandidates(state, keyResultId);
      state = addToUnprocessed(state, keyResultId, payload)
      return isMine(keyResultId, payload) ? add(state, keyResultId) : state;
    },
    [ActionTypes.UPDATED_KEY_RESULT]: (state, { payload }) => {
      const keyResultId = payload.get('result').first();
      state = addToUnprocessed(state, keyResultId, payload, true)
      return isMine(keyResultId, payload) ? add(state, keyResultId) : remove(state, keyResultId)
    },
    [ActionTypes.REMOVED_KEY_RESULT]: (state, { payload }) => {
      const keyResultId = payload.get('result').first();
      state = removeFromCandidates(state, keyResultId);
      state = removeFromUnprocessed(state, keyResultId)
      return remove(state, keyResultId);
    },
    [ActionTypes.PROCESSED_KEY_RESULT]: (state, { payload }) => {
      return removeFromUnprocessed(state, payload.id)
    },
    [ActionTypes.ADDED_OBJECTIVE]: (state, { payload }) => {
      state = removeParentFromUnprocessed(state, payload)
      return addParentAndKeyResults(state, payload)
    },
    [ActionTypes.UPDATED_OBJECTIVE]: (state, { payload }) => {
      state = removeParentFromUnprocessed(state, payload)
      return addParentAndKeyResults(state, payload)
    },
  },
  fromJS({
    ids: [],
    candidateIds: [],
    unprocessedIds: [],
    isFetchedKeyResults: false,
    isFetchedCandidates: false,
  }),
);
