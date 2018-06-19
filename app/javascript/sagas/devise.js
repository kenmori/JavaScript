import { all, takeLatest } from 'redux-saga/effects';
import call from '../utils/call';
import API from '../utils/api';
import actionTypes from '../constants/actionTypes';

function* signIn({ payload }) {
  yield call(API.post, '/users/sign_in', { user: payload.params });
  location.href = '/';
}

function* signOut() {
  yield call(API.delete, '/users/sign_out');
  location.href = '/';
}

export function *deviseSagas() {
  yield all([
    takeLatest(actionTypes.SIGN_IN, signIn),
    takeLatest(actionTypes.SIGN_OUT, signOut),
  ]);
}
