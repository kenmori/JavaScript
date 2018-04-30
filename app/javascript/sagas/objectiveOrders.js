import { all, put, select, takeLatest } from 'redux-saga/effects';
import call from '../utils/call';
import API from '../utils/api';
import withLoading from '../utils/withLoading';
import objectiveOrderActions from '../actions/objectiveOrders';
import actionTypes from '../constants/actionTypes';

function* updateObjectiveOrder({ payload }) {
  const [userId, okrPeriodId] = yield select(state => [state.current.get('userId'), state.current.get('okrPeriodId')]);
  const objectiveOrder = { userId, okrPeriodId, list: payload.list };
  const result = yield call(API.put, '/objective_orders', { objectiveOrder });
  yield put(objectiveOrderActions.updatedObjectiveOrder(result.get('list')));
}

export function* objectiveOrderSagas() {
  yield all([
    takeLatest(actionTypes.UPDATE_OBJECTIVE_ORDER, withLoading(updateObjectiveOrder)),
  ]);
}
