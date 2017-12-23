import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import ActionTypes from '../constants/actionTypes';
import gon from '../utils/gon';

const initialState = fromJS({
  selected: gon.get('organization'),
  list: gon.get('organizations')
});

export default handleActions({
  [ActionTypes.UPDATE_CURRENT_ORGANIZATION_ID]: (state, { payload }) => (
    state
  ),
  [ActionTypes.UPDATED_LOGO]: (state, { payload }) => {
    if(state.get('selected').get('id') === payload.organization.get('id')) {
      const newSelectedData = state.get('selected').merge(payload.organization);
      return state.set('selected', newSelectedData);
    }

    return state;
  }
}, initialState);
