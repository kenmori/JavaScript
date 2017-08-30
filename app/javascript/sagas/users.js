import { all, call, put, takeLatest } from 'redux-saga/effects';
import API from '../utils/api';
import userActions from '../actions/users';
import actionTypes from '../constants/actionTypes';

function* fetchUsers() {
  const result = yield call(API.get, '/users');
  yield put(userActions.fetchedUsers(result));
}

function* addUser({ payload }) {
  const result = yield call(API.post, '/users', payload.user);
  yield put(userActions.addedUser(result));
}

function* updateUser({ payload }) {
  const result = yield call(API.put, '/users/' + payload.user.id, payload.user);
  yield put(userActions.updatedUser(result));
}

function* removeUser({ payload }) {
  yield call(API.delete, '/users/' + payload.id);
  yield put(userActions.removedUser(payload.id));
}

export function* userSagas() {
  yield all([
    takeLatest(actionTypes.FETCH_USERS, fetchUsers),
    takeLatest(actionTypes.ADD_USER, addUser),
    takeLatest(actionTypes.UPDATE_USER, updateUser),
    takeLatest(actionTypes.REMOVE_USER, removeUser),
  ]);
}
