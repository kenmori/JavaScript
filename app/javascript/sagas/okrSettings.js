import { all, put, takeLatest } from 'redux-saga/effects';
import call from '../utils/call';
import API from '../utils/api';
import settingActions from '../actions/okrSettings';
import actionTypes from '../constants/actionTypes';
import withLoading from '../utils/withLoading';

function* fetchOkrSettings({ payload }) {
  const result = yield call(API.get, `/organizations/${payload.organizationId}/okr_settings`);
  yield put(settingActions.fetchedOkrSettings(result));
}

function* updateOkrSettings({ payload }) {
  const result = yield call(API.put, `/organizations/${payload.organizationId}/okr_settings`, { okrSettings: payload.okrSettings });
  yield put(settingActions.updatedOkrSettings(result));
}

function* resetOkrSettings({ payload }) {
  const result = yield call(API.post, `/organizations/${payload.organizationId}/okr_settings`);
  yield put(settingActions.didResetOkrSettings(result));
}

export function* okrSettingSagas() {
  yield all([
    takeLatest(actionTypes.FETCH_OKR_SETTINGS, withLoading(fetchOkrSettings)),
    takeLatest(actionTypes.UPDATE_OKR_SETTINGS, withLoading(updateOkrSettings)),
    takeLatest(actionTypes.RESET_OKR_SETTINGS, withLoading(resetOkrSettings)),
  ]);
}
