import { createActions } from 'redux-actions';
import actionTypes from '../constants/actionTypes';

const actions = createActions({
  [actionTypes.FETCH_ORGANIZATION]: id => ({ id }),
  [actionTypes.FETCHED_ORGANIZATION]: organization => ({ organization }),
  [actionTypes.ADD_ORGANIZATION]: (organization, user, okrPeriod) => ({ organization, user, okrPeriod }),
  [actionTypes.ADDED_ORGANIZATION]: organization => ({ organization }),
  [actionTypes.UPDATE_ORGANIZATION]: organization => ({ organization }),
  [actionTypes.UPDATED_ORGANIZATION]: organization => ({ organization }),
  [actionTypes.UPDATE_ORGANIZATION_OWNER]: (organizationId, userId) => ({ organizationId, userId }),
  [actionTypes.UPDATED_ORGANIZATION_OWNER]: ownerId => ({ ownerId }),
  [actionTypes.EXPORT_OKRS]: (organizationId, okrPeriodId) => ({ organizationId, okrPeriodId }),
  [actionTypes.EXPORTED_OKRS]: () => {},
});

export default actions;
