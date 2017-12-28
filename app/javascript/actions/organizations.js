import { createActions } from 'redux-actions';
import actionTypes from '../constants/actionTypes';

const actions = createActions({
  [actionTypes.FETCH_ORGANIZATION]: organization => ({ organization }),
  [actionTypes.FETCHD_ORGANIZATION]: organization => ({ organization }),
  [actionTypes.UPDATE_ORGANIZATION]: organization => ({ organization }),
  [actionTypes.UPDATED_ORGANIZATION]: organization => ({ organization }),
  [actionTypes.UPDATE_LOGO]: organization => ({ organization }),
  [actionTypes.UPDATED_LOGO]: organization => ({ organization }),
});

export default actions;
