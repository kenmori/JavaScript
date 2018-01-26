import { Map } from 'immutable';
import { handleActions } from 'redux-actions';
import ActionTypes from '../../constants/actionTypes';

function merge(state, { payload }) {
  if (!payload.getIn(['entities', 'keyResults'])) return state;
  // normalizeした結果ではidがstringになっているためintへ変換する
  return state.merge(
    payload.getIn(['entities', 'keyResults'])
      .filter(keyResult => keyResult.get('isFull'))
      .mapKeys(key => parseInt(key))
  );
}

function updateProgressRate(state, { payload }) {
  const keyResults = payload.getIn(['entities', 'keyResults']);
  return state.map((keyResult, keyResultId) =>
    keyResult.update('progressRate', progressRate =>
      keyResults.getIn([`${keyResultId}`, 'progressRate']) || progressRate
    )
  );
}

export default handleActions({
    [ActionTypes.FETCHED_KEY_RESULTS]: merge,
    [ActionTypes.ADDED_KEY_RESULT]: (state, { payload }) => {
      state = updateProgressRate(state, { payload });
      return merge(state, { payload });
    },
    [ActionTypes.UPDATED_KEY_RESULT]: (state, { payload }) => {
      state = updateProgressRate(state, { payload });
      return merge(state, { payload });
    },
    [ActionTypes.REMOVED_KEY_RESULT]: (state, { payload }) => {
      state = updateProgressRate(state, { payload });
      const keyResultId = payload.get('result').first();
      return state.delete(keyResultId);
    },
    [ActionTypes.FETCHED_OBJECTIVE]: merge,
    [ActionTypes.FETCHED_OBJECTIVES]: merge,
    [ActionTypes.ADDED_OBJECTIVE]: merge,
    [ActionTypes.UPDATED_OBJECTIVE]: merge,
  }, Map()
)
