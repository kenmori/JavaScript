import { Map } from 'immutable';
import { handleActions } from 'redux-actions';
import ActionTypes from '../../constants/actionTypes';

function merge(state, { payload }) {
  const keyResult = payload.get('keyResult');
  return state.set(keyResult.get('id'), keyResult);
}

export default handleActions({
    [ActionTypes.ADDED_KEY_RESULT]: merge,
    [ActionTypes.UPDATED_KEY_RESULT]: merge,
    [ActionTypes.REMOVED_KEY_RESULT]: (state, { payload }) => (state.delete(payload.get('id'))),
    [ActionTypes.FETCHED_OBJECTIVES]: (state, { payload }) => {
      return state.merge(
        payload.getIn(['entities', 'keyResults'])
          .mapKeys((key) => (parseInt(key))) // normalizeした結果ではidがstringになっているためintへ変換する
      )
    },
  }, Map()
)

