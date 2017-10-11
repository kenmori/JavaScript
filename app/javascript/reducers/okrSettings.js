import { fromJS, Map } from 'immutable';
import { handleActions } from 'redux-actions';
import ActionTypes from '../constants/actionTypes';

export default handleActions({
    [ActionTypes.FETCHED_OKR_SETTINGS]: (state, { payload }) => (
      state.merge(payload.okrSettings)
    ),
    [ActionTypes.UPDATED_OKR_SETTINGS]: (state, { payload }) => (
      state.merge(payload.okrSettings)
    ),
    [ActionTypes.DID_RESET_OKR_SETTINGS]: (state, { payload }) => (
      state.clear().merge(payload.okrSettings)
    ),
  },
  fromJS({}),
);
