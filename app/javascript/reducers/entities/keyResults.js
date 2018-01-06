import { Map } from 'immutable';
import { handleActions } from 'redux-actions';
import ActionTypes from '../../constants/actionTypes';

function merge(state, { payload }) {
  if (!payload.getIn(['entities', 'keyResults'])) return state;
  // normalizeした結果ではidがstringになっているためintへ変換する
  return state.merge(
    payload.getIn(['entities', 'keyResults']).mapKeys((key) => (parseInt(key)))
      .map(
        (keyResult) => {
          return keyResult
            .update('objective', (objectiveId) => (parseInt(objectiveId)))
        }
      )
  );
}

export default handleActions({
    [ActionTypes.FETCHED_KEY_RESULTS]: merge,
    [ActionTypes.ADDED_KEY_RESULT]: merge,
    [ActionTypes.UPDATED_KEY_RESULT]: merge,
    [ActionTypes.REMOVED_KEY_RESULT]: (state, { payload }) => (state.delete(payload.get('id'))),
    [ActionTypes.FETCHED_OBJECTIVES]: (state, { payload }) => {
      if (!payload.getIn(['entities', 'keyResults'])) return state;
      return state.merge(
        payload.getIn(['entities', 'keyResults'])
          .mapKeys((key) => (parseInt(key))) // normalizeした結果ではidがstringになっているためintへ変換する
      )
    },
  }, Map()
)
