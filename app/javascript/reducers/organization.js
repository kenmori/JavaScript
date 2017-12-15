import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import ActionTypes from '../constants/actionTypes';
import gon from '../utils/gon';

const initialState = fromJS({
  id: gon.getIn(['organization', 'id']),
  name: gon.getIn(['organization', 'name']),
});

export default handleActions({
}, initialState);