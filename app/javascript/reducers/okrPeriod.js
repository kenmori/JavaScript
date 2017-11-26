import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import ActionTypes from '../constants/actionTypes';
import gon from '../utils/gon';

const initialState = fromJS({
  id: gon.getIn(['okrPeriod', 'id']),
});

export default handleActions({
  [ActionTypes.CHANGE_OKR_PERIOD_ID]: (state, { payload }) => {
    return state.set('id', payload.okrPeriodId);
  },
}, initialState);
