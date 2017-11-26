import { createActions } from 'redux-actions';
import actionTypes from '../constants/actionTypes';

const actions = createActions({
  [actionTypes.CHANGE_OKR_PERIOD]: (okrPeriodId) => ({ okrPeriodId }),
});

export default actions;
