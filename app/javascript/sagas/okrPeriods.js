import { all, put, takeLatest } from 'redux-saga/effects';
import call from '../utils/call';
import API from '../utils/api';
import withLoading from '../utils/withLoading';
import okrPeriodActions from '../actions/okrPeriods';
import actionTypes from '../constants/actionTypes';

function* fetchOkrPeriods({ payload }) {
  const query = payload.organizationId ? { organizationId: payload.organizationId } : {};
  const result = yield call(API.get, '/okr_periods', query);
  yield put(okrPeriodActions.fetchedOkrPeriods(result));
}

export function* okrPeriodSagas() {
  yield all([
    takeLatest(actionTypes.FETCH_OKR_PERIODS, withLoading(fetchOkrPeriods)),
  ]);
}
