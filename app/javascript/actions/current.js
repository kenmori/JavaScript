import { createActions } from 'redux-actions';
import actionTypes from '../constants/actionTypes';

const actions = createActions({
  [actionTypes.CHANGE_CURRENT_OKR_PERIOD]: okrPeriodId => ({ okrPeriodId }),
  [actionTypes.CHANGE_CURRENT_USER]: userId => ({ userId }),
  [actionTypes.CHANGE_CURRENT_OBJECTIVE]: objectiveId => ({ objectiveId }),
  [actionTypes.CHANGE_CURRENT_KEY_RESULT]: keyResultId => ({ currentKeyResult: keyResultId }),
});

export default actions;
