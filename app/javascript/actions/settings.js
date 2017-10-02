import { createActions } from 'redux-actions';
import actionTypes from '../constants/actionTypes';

const actions = createActions({
  [actionTypes.FETCH_OKR_SETTING]: organizationId => ({ organizationId }),
  [actionTypes.FETCHED_OKR_SETTING]: okrSetting => ({ okrSetting }),
});

export default actions;
