import { all, call, put, takeLatest } from 'redux-saga/effects';
import API from '../utils/api';
import withLoading from '../utils/withLoading';
import okrPeriodActions from '../actions/okrPeriods';
import actionTypes from '../constants/actionTypes';

function* fetchOkrPeriods() {
  const result = yield call(API.get, '/okr_periods');
  yield put(okrPeriodActions.fetchedOkrPeriods(result));
}

export function* okrPeriodSagas() {
  yield all([
    takeLatest(actionTypes.FETCH_OKR_PERIODS, withLoading(fetchOkrPeriods)),
  ]);
}
