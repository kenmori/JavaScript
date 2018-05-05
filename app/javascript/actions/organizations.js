import { createActions } from 'redux-actions';
import actionTypes from '../constants/actionTypes';

const actions = createActions({
  [actionTypes.FETCH_ORGANIZATION]: id => ({ id }),
  [actionTypes.FETCHED_ORGANIZATION]: organization => ({ organization }),
  [actionTypes.UPDATE_ORGANIZATION]: organization => ({ organization }),
  [actionTypes.UPDATED_ORGANIZATION]: organization => ({ organization }),
  [actionTypes.UPDATE_LOGO]: organization => ({ organization }),
  [actionTypes.UPDATED_LOGO]: organization => ({ organization }),
});

export default actions;
