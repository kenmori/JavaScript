import { createActions } from 'redux-actions';
import actionTypes from '../constants/actionTypes';

const actions = createActions({
  [actionTypes.FETCH_OKR_PERIODS]: organizationId => ({ organizationId }),
  [actionTypes.FETCHED_OKR_PERIODS]: okrPeriods => ({ okrPeriods }),
});

export default actions;
