import { all, put, takeLatest } from 'redux-saga/effects';
import call from '../utils/call';
import API from '../utils/api';
import objectiveActions from '../actions/objectives';
import keyResultActions from '../actions/keyResults';
import loadingActions from '../actions/loading';
import actionTypes from '../constants/actionTypes';
import withLoading from '../utils/withLoading';

function* fetchOkrs({ payload }) {
  let result = yield call(API.get, '/objectives', { okrPeriodId: payload.okrPeriodId, userId: payload.userId });
  yield put(objectiveActions.fetchedObjectives(result.get('objectives')));

  yield put(loadingActions.forceCloseLoadingOff());
  yield put(loadingActions.closeLoading());

  result = yield call(API.get, '/key_results', { okrPeriodId: payload.okrPeriodId, userId: payload.userId });
  yield put(keyResultActions.fetchedKeyResults(result.get('keyResults')));

  if (payload.withAllKeyResults) {
    result = yield call(API.get, '/key_results', { okrPeriodId: payload.okrPeriodId });
    yield put(keyResultActions.fetchedAllKeyResults(result.get('keyResults')));
  }
}

export function* okrSagas() {
  yield all([
    takeLatest(actionTypes.FETCH_OKRS, withLoading(fetchOkrs)),
  ]);
}
