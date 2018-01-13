import { fromJS } from 'immutable';
import { all, put, takeLatest } from 'redux-saga/effects';
import call from '../utils/call';
import API from '../utils/api';
import withLoading from '../utils/withLoading';
import okrPeriodActions from '../actions/okrPeriods';
import actionTypes from '../constants/actionTypes';


function* addOkrPeriod({ payload }) {
  const result = yield call(API.post, '/okr_periods', { okrPeriod: payload.okrPeriod });
  yield put(okrPeriodActions.addedOkrPeriod(result.get('okrPeriod')));
}

function* updateOkrPeriod({ payload }) {
  const result = yield call(API.put, '/okr_periods/' + payload.okrPeriod.id, { okrPeriod: payload.okrPeriod });
  yield put(okrPeriodActions.updatedOkrPeriod(result.get('okrPeriod')));
}

function* removeOkrPeriod({ payload }) {
  yield call(API.delete, '/okr_periods/' + payload.okrPeriod.id);
  yield put(okrPeriodActions.removedOkrPeriod(payload.okrPeriod.id));
}

export function* okrPeriodSagas() {
  yield all([
    takeLatest(actionTypes.ADD_OKR_PERIOD, withLoading(addOkrPeriod)),
    takeLatest(actionTypes.UPDATE_OKR_PERIOD, withLoading(updateOkrPeriod)),
    takeLatest(actionTypes.REMOVE_OKR_PERIOD, withLoading(removeOkrPeriod)),
  ]);
}
