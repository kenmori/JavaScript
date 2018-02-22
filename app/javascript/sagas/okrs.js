import { all, put, takeLatest } from 'redux-saga/effects';
import objectiveActions from '../actions/objectives';
import keyResultActions from '../actions/keyResults';
import actionTypes from '../constants/actionTypes';

function* fetchOkrs({ payload }) {
  yield put(objectiveActions.fetchObjectives(payload.okrPeriodId, payload.userId));

  yield put(keyResultActions.fetchKeyResults(payload.okrPeriodId, payload.userId));

  if (payload.withAllKeyResults) {
    yield put(keyResultActions.fetchAllKeyResults(payload.okrPeriodId));
  }
}

export function* okrSagas() {
  yield all([
    takeLatest(actionTypes.FETCH_OKRS, fetchOkrs),
  ]);
}
