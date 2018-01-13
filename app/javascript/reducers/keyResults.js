import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import ActionTypes from '../constants/actionTypes';

export default handleActions({
    [ActionTypes.FETCHED_KEY_RESULTS]: (state, { payload }) => {
      return fromJS(payload.get('result'));
    },
    [ActionTypes.ADDED_KEY_RESULT]: (state, { payload }) => {
      const userId = payload.get('currentUserId');
      const keyResultId = payload.get('result').first();
      const keyResult = payload.getIn(['entities', 'keyResults', `${keyResultId}`]);
      const shouldAdd = userId === keyResult.get('owner').get('id')
        || keyResult.get('keyResultMembers').some(member => member.get('id') === userId);
      return shouldAdd ? state.insert(0, keyResultId) : state;
    },
    [ActionTypes.REMOVED_KEY_RESULT]: (state, { payload }) => {
      const keyResultId = payload.get('result').first();
      return state.filter((id) => (id !== keyResultId));
    },
  },
  fromJS([]),
);
