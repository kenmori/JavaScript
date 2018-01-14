import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import ActionTypes from '../constants/actionTypes';
import gon from '../utils/gon';

const initialState = fromJS({
  okrPeriodId: gon.getIn(['okrPeriod', 'id']),
  userId: gon.getIn(['loginUser', 'id']),
});

export default handleActions({
  [ActionTypes.CHANGE_CURRENT_OKR_PERIOD]: (state, { payload }) => (
    state.set('okrPeriodId', payload.okrPeriodId)
  ),
  [ActionTypes.CHANGE_CURRENT_USER]: (state, { payload }) => (
    state.set('userId', payload.userId)
  ),
}, initialState);
