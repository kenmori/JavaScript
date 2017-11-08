import { all, call, put, takeLatest } from 'redux-saga/effects';
import API from '../utils/api';
import userActions from '../actions/users';
import actionTypes from '../constants/actionTypes';

function* fetchUser({ payload }) {
  const result = yield call(API.get, '/users/' + payload.id);
  yield put(userActions.fetchedUser(result));
}

function* fetchUsers() {
  const result = yield call(API.get, '/users');
  yield put(userActions.fetchedUsers(result));
}

function* addUser({ payload }) {
  const result = yield call(API.post, '/users', { user: payload.user });
  yield put(userActions.addedUser(result.get('user')));
}

function* updateUser({ payload }) {
  const result = yield call(API.put, '/users/' + payload.user.id, { user: payload.user });
  yield put(userActions.updatedUser(result.get('user')));
}

function* removeUser({ payload }) {
  yield call(API.delete, '/users/' + payload.id);
  yield put(userActions.removedUser(payload.id));
}

function* updatePassword({ payload }) {
  const result = yield call(API.put, `/users/${payload.user.id}/password`, { user: payload.user });
  yield put(userActions.updatedUser(result));
}

function* recoverPassword({ payload }) {
  const result = yield call(API.post, '/users/password', { user: payload.user });
  yield put(userActions.recoveredPassword(result));
}

function* editPassword({ payload }) {
  const result = yield call(API.put, '/users/password', { user: payload.user });
  yield put(userActions.editedPassword(result));
}

export function* userSagas() {
  yield all([
    takeLatest(actionTypes.FETCH_USER, fetchUser),
    takeLatest(actionTypes.FETCH_USERS, fetchUsers),
    takeLatest(actionTypes.ADD_USER, addUser),
    takeLatest(actionTypes.UPDATE_USER, updateUser),
    takeLatest(actionTypes.REMOVE_USER, removeUser),
    takeLatest(actionTypes.UPDATE_PASSWORD, updatePassword),
    takeLatest(actionTypes.RECOVER_PASSWORD, recoverPassword),
    takeLatest(actionTypes.EDIT_PASSWORD, editPassword),
  ]);
}
