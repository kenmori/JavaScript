import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import ActionTypes from '../constants/actionTypes';

function add(state, keyResultId) {
  return state.includes(keyResultId) ? state : state.insert(0, keyResultId);
}

function remove(state, keyResultId) {
  return state.filter(id => id !== keyResultId);
}

export default handleActions({
    [ActionTypes.FETCHED_KEY_RESULTS]: (state, { payload }) => {
      return payload.get('result');
    },
    [ActionTypes.ADDED_KEY_RESULT]: (state, { payload }) => {
      const userId = payload.get('currentUserId');
      const keyResultId = payload.get('result').first();
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
      return remove(state, keyResultId);
    },
  },
  fromJS([]),
);
