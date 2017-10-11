import { all, call, put, takeLatest } from 'redux-saga/effects';
import API from '../utils/api';
import settingActions from '../actions/okrSettings';
import actionTypes from '../constants/actionTypes';

function* fetchOkrSettings({ payload }) {
  const result = yield call(API.get, '/okr_settings/' + payload.organizationId);
  yield put(settingActions.fetchedOkrSettings(result));
}

function* updateOkrSettings({ payload }) {
  const result = yield call(API.put, '/okr_settings/' + payload.organizationId, { okrSettings: payload.okrSettings });
  yield put(settingActions.updatedOkrSettings(result));
}

function* resetOkrSettings({ payload }) {
  const result = yield call(API.post, '/okr_settings/', { id: payload.organizationId });
  yield put(settingActions.didResetOkrSettings(result));
}

export function* okrSettingSagas() {
  yield all([
    takeLatest(actionTypes.FETCH_OKR_SETTINGS, fetchOkrSettings),
    takeLatest(actionTypes.UPDATE_OKR_SETTINGS, updateOkrSettings),
    takeLatest(actionTypes.RESET_OKR_SETTINGS, resetOkrSettings),
  ]);
}
