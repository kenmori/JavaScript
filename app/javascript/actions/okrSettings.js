import { createActions } from 'redux-actions';
import actionTypes from '../constants/actionTypes';

const actions = createActions({
  [actionTypes.FETCH_OKR_SETTINGS]: organizationId => ({ organizationId }),
  [actionTypes.FETCHED_OKR_SETTINGS]: okrSettings => ({ okrSettings }),
  [actionTypes.UPDATE_OKR_SETTINGS]: (organizationId, okrSettings) => ({ organizationId, okrSettings }),
  [actionTypes.UPDATED_OKR_SETTINGS]: okrSettings => ({ okrSettings }),
  [actionTypes.RESET_OKR_SETTINGS]: organizationId => ({ organizationId }),
  [actionTypes.DID_RESET_OKR_SETTINGS]: okrSettings => ({ okrSettings }),
});

export default actions;
