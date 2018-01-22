import { createActions } from 'redux-actions';
import actionTypes from '../constants/actionTypes';

const actions = createActions({
  [actionTypes.CHANGE_CURRENT_OKR_PERIOD]: okrPeriodId => ({ okrPeriodId }),
  [actionTypes.CHANGE_CURRENT_USER]: userId => ({ userId }),
  [actionTypes.CHANGE_CURRENT_OKR]: (objectiveId, keyResultId = null) => ({ objectiveId, keyResultId }),
});

export default actions;
