import { createActions } from 'redux-actions';
import actionTypes from '../constants/actionTypes';

const actions = createActions({
  [actionTypes.FETCH_OKRS]: (okrPeriodId, userId, withAllKeyResults) => ({ okrPeriodId, userId, withAllKeyResults }),
});

export default actions;
