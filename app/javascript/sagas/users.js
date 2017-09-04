import { all, call, put, takeLatest } from 'redux-saga/effects';
import API from '../utils/api';
import userActions from '../actions/users';
import actionTypes from '../constants/actionTypes';
import history from '../utils/history';

function* fetchUsers() {
  const result = yield call(API.get, '/users');
  yield put(userActions.fetchedUsers(result));
}

function* addUser({ payload }) {
  const result = yield call(API.post, '/users', { user: payload.user });
  yield put(userActions.addedUser(result.get('user')));
  yield call(history.go); //react-routerのバグのためここで無理やり画面を再読み込みさせている。今後、改修されれば削除する。
}

function* updateUser({ payload }) {
  const result = yield call(API.put, '/users/' + payload.user.id, { user: payload.user });
  yield put(userActions.updatedUser(result.get('user')));
  yield call(history.go); //react-routerのバグのためここで無理やり画面を再読み込みさせている。今後、改修されれば削除する。
}

function* removeUser({ payload }) {
  yield call(API.delete, '/users/' + payload.id);
  yield put(userActions.removedUser(payload.id));
  yield call(history.go); //react-routerのバグのためここで無理やり画面を再読み込みさせている。今後、改修されれば削除する。
}

export function* userSagas() {
  yield all([
    takeLatest(actionTypes.FETCH_USERS, fetchUsers),
    takeLatest(actionTypes.ADD_USER, addUser),
    takeLatest(actionTypes.UPDATE_USER, updateUser),
    takeLatest(actionTypes.REMOVE_USER, removeUser),
  ]);
}
