import { all, call, put, takeLatest } from 'redux-saga/effects';
import API from '../utils/api';
import settingActions from '../actions/settings';
import actionTypes from '../constants/actionTypes';

function* fetchOkrSetting({ payload }) {
  const result = yield call(API.get, '/settings/' + payload.organizationId);
  yield put(settingActions.fetchedOkrSetting(result));
}

export function* settingSagas() {
  yield all([
    takeLatest(actionTypes.FETCH_OKR_SETTING, fetchOkrSetting),
  ]);
}
