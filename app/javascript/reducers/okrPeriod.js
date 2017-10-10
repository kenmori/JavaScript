import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import gon from '../utils/gon';

const initialState = fromJS({
  id: gon.getIn(['okrPeriod', 'id']),
});

export default handleActions({}, initialState);
