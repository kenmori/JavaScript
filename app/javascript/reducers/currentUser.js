import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import gon from '../utils/gon';

const initialState = fromJS({
  lastName: gon.getIn(['currentUser', 'lastName']),
  firstName: gon.getIn(['currentUser', 'firstName']),
  email: gon.getIn(['currentUser', 'email']),
});

export default handleActions({}, initialState);
