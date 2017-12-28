import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import ActionTypes from '../constants/actionTypes';
import gon from '../utils/gon';

const initialState = fromJS({
  selected: gon.get('organization'),
  list: gon.get('organizations')
});

function newSelectedData(state, payload) {
  const isSelectedData = state.get('selected').get('id') === payload.organization.get('id')
  
  if(isSelectedData) {
    const newData = state.get('selected').merge(payload.organization);
    return state.set('selected', newData);
  }

  return state;
}

export default handleActions({
  [ActionTypes.UPDATE_CURRENT_ORGANIZATION_ID]: (state, { payload }) => (
    state
  ),
  [ActionTypes.FETCHED_ORGANIZATION]: (state, { payload }) => (
    newSelectedData(state, payload)
  ),
  [ActionTypes.UPDATED_ORGANIZATION]: (state, { payload }) => {
    newSelectedData(state, payload)
  },
  [ActionTypes.UPDATED_LOGO]: (state, { payload }) => {
    newSelectedData(state, payload)
  }
}, initialState);
