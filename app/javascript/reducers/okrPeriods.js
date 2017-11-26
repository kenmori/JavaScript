import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import ActionTypes from '../constants/actionTypes';

export default handleActions({
  [ActionTypes.FETCHED_OKR_PERIODS]: (state, { payload }) => {
    return state.merge(payload.okrPeriods);
  },
}, fromJS([]));
