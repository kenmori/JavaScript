import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import gon from '../utils/gon';

const initialState = fromJS({
  lastName: gon.getIn(['loginUser', 'lastName']),
  firstName: gon.getIn(['loginUser', 'firstName']),
  email: gon.getIn(['loginUser', 'email']),
});

export default handleActions({}, initialState);
