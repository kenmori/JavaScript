import { all, call, takeLatest } from 'redux-saga/effects';
import API from '../utils/api';
import actionTypes from '../constants/actionTypes';
import history from '../utils/history';

function* signIn({ payload }) {
  yield call(API.post, '/users/sign_in', { user: payload.params });
  yield call(history.replace, '/');
  yield call(history.go); //react-routerのバグのためここで無理やり画面を再読み込みさせている。今後、改修されれば削除する。
}

function* signOut() {
  yield call(API.delete, '/users/sign_out');
  yield call(history.push, '/users/sign_in');
  yield call(history.go); //react-routerのバグのためここで無理やり画面を再読み込みさせている。今後、改修されれば削除する。
}

export function *sessionSagas() {
  yield all([
    takeLatest(actionTypes.SIGN_IN, signIn),
    takeLatest(actionTypes.SIGN_OUT, signOut),
  ]);
}
