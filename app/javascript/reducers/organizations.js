import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import ActionTypes from '../constants/actionTypes';
import gon from '../utils/gon';

const organizations = gon.get('organizations');
const initialSelectedOrganization = organizations ? organizations.get(0) : fromJS({});
const initialState = fromJS({
  selected: fromJS({
    id: initialSelectedOrganization.get('id'),
    name: initialSelectedOrganization.get('name'),
  }),
  list: organizations
});

export default handleActions({
  [ActionTypes.UPDATE_CURRENT_ORGANIZATION_ID]: (state, { payload }) => console.log(111, payload) || (
    state
  ),
}, initialState);
