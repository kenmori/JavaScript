import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import ActionTypes from '../constants/actionTypes';
import gon from '../utils/gon';

const initialState = fromJS({
  okrPeriodId: gon.getIn(['okrPeriod', 'id']),
  userId: gon.getIn(['loginUser', 'id']),
  userIdAtFetchedObjectives: gon.getIn(['loginUser', 'id']),
  userIdAtFetchedKeyResults: gon.getIn(['loginUser', 'id']),
  userIdAtFetchedTaskKeyResults: gon.getIn(['loginUser', 'id']),
});

export default handleActions({
  [ActionTypes.SELECTED_OKR_PERIOD]: (state, { payload }) => (
    state.set('okrPeriodId', payload.okrPeriodId)
  ),
  [ActionTypes.SELECTED_USER]: (state, { payload }) => (
    state.set('userId', payload.userId)
  ),
  [ActionTypes.FETCHED_OBJECTIVES]: state => {
    return state.set('userIdAtFetchedObjectives', state.get('userId'))
      .set('userIdAtFetchedTaskKeyResults', state.get('userId')) // タスク KR の fetch 省略を考慮
  },
  [ActionTypes.FETCHED_KEY_RESULTS]: state => {
    return state.set('userIdAtFetchedKeyResults', state.get('userId'))
  },
  [ActionTypes.FETCHED_UNPROCESSED_KEY_RESULTS]: state => {
    return state.set('userIdAtFetchedTaskKeyResults', state.get('userId'))
  },
}, initialState);
