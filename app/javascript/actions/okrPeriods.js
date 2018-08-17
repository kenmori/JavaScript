import { createActions } from 'redux-actions';
import actionTypes from '../constants/actionTypes';

const actions = createActions({
  [actionTypes.ADD_OKR_PERIOD]: okrPeriod => ({ okrPeriod }),
  [actionTypes.ADDED_OKR_PERIOD]: okrPeriod => ({ okrPeriod }),
  [actionTypes.UPDATE_OKR_PERIOD]: okrPeriod => ({ okrPeriod }),
  [actionTypes.UPDATED_OKR_PERIOD]: okrPeriod => ({ okrPeriod }),
  [actionTypes.REMOVE_OKR_PERIOD]: okrPeriod => ({ okrPeriod }),
  [actionTypes.REMOVED_OKR_PERIOD]: okrPeriod => ({ okrPeriod }),
  [actionTypes.EXPORT_OKRS]: okrPeriodId => ({ okrPeriodId }),
});

export default actions;
