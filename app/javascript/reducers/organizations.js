import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import ActionTypes from '../constants/actionTypes';
import gon from '../utils/gon';

const initialState = fromJS({
  selected: gon.get('organization'),
  list: gon.get('organizations')
});

function isSelectedData(state, payload) {
  return state.get('selected').get('id') === payload.organization.get('id')
}

export default handleActions({
  [ActionTypes.UPDATE_CURRENT_ORGANIZATION_ID]: (state, { payload }) => (
    state
  ),
  [ActionTypes.UPDATED_ORGANIZATIONM]: (state, { payload }) => {
    if(isSelectedData(state, payload)) {
      const newSelectedData = state.get('selected').merge(payload.organization);
      return state.set('selected', newSelectedData);
    }

    return state;
  },
  [ActionTypes.UPDATED_LOGO]: (state, { payload }) => {
    if(isSelectedData(state, payload)) {
      const newSelectedData = state.get('selected').merge(payload.organization);
      return state.set('selected', newSelectedData);
    }

    return state;
  }
}, initialState);
