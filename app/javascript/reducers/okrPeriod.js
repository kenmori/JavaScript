import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import gon from '../utils/gon';
import ActionTypes from '../constants/actionTypes';

const initialState = fromJS({
  id: gon.getIn(['okrPeriod', 'id']),
});

export default handleActions({
  [ActionTypes.CHANGE_OKR_PERIOD]: (state, { payload }) => (
    state.set('id', payload.okrPeriodId)
  ),
}, initialState);
