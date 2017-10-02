import { all, call, put, takeLatest } from 'redux-saga/effects';
import API from '../utils/api';
import settingActions from '../actions/settings';
import actionTypes from '../constants/actionTypes';

function* fetchOkrSetting({ payload }) {
  // TODO ダミー結果 → API 経由で取得する
  const result = {
    yearEnd: 3,
    okrSpan: 3,
    okrReady: { from: 20, to: 1, },
    okrReview: {
      during: { from: 45, to: 50, },
      end: { from: 1, to: 7, },
    },
  };
  yield put(settingActions.fetchedOkrSetting(result));
}

export function* settingSagas() {
  yield all([
    takeLatest(actionTypes.FETCH_OKR_SETTING, fetchOkrSetting),
  ]);
}
