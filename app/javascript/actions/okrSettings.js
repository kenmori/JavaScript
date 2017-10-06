import { createActions } from 'redux-actions';
import actionTypes from '../constants/actionTypes';

const actions = createActions({
  [actionTypes.FETCH_OKR_SETTINGS]: organizationId => ({ organizationId }),
  [actionTypes.FETCHED_OKR_SETTINGS]: okrSettings => ({ okrSettings }),
  [actionTypes.UPDATE_OKR_SETTINGS]: (organizationid, okrSettings) => ({ organizationId: organizationid, okrSettings }),
  [actionTypes.UPDATED_OKR_SETTINGS]: okrSettings => ({ okrSettings }),
});

export default actions;
