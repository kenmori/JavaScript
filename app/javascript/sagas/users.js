import { all, put, select, takeLatest } from 'redux-saga/effects';
import call from '../utils/call';
import API from '../utils/api';
import withLoading from '../utils/withLoading';
import userActions from '../actions/users';
import actionTypes from '../constants/actionTypes';
import toastActions from '../actions/toasts';
import deviseActions from '../actions/devise'
import dialogActions from '../actions/dialogs'

function* addUser({ payload }) {
  const result = yield call(API.post, '/users', { user: payload.user });
  yield put(userActions.addedUser(result.get('user')));
  yield put(toastActions.showToast('ユーザーを追加しました'));
}

function* updateUser({ payload: { user } }) {
  const result = yield call(API.put, '/users/' + user.id, { user });
  yield put(userActions.updatedUser(result.get('user')));

  if (user.email) {
    yield put(toastActions.showToast('メールアドレスを変更しました', 'success'))
    // ログインユーザーのメールアドレスを変更した場合はログアウトする
    const loginUserId = yield select(state => state.loginUser.get('id'))
    if (user.id === loginUserId) {
      yield put(deviseActions.signOut())
    }
  } else if (user.avatar || user.removeAvatar) {
    // アバター更新時はトーストを表示しない
    if (user.avatar) {
      yield put(dialogActions.closeAvatarModal())
    }
  } else {
    yield put(toastActions.showToast('ユーザー情報を更新しました'))
  }
}

function* removeUser({ payload }) {
  const result = yield call(API.delete, '/users/' + payload.id);
  yield put(userActions.removedUser(result.get('user')));
  yield put(toastActions.showToast('ユーザーを無効化しました'));
}

function* restoreUser({ payload }) {
  const result = yield call(API.put, `/users/${payload.id}/restore`, {});
  yield put(userActions.restoredUser(result.get('user')));
  yield put(toastActions.showToast('ユーザーを有効化しました'));
}

function* updatePassword({ payload }) {
  yield call(API.put, `/users/${payload.user.id}/password`, { user: payload.user });
  yield put(toastActions.showToast('パスワードを変更しました', 'success'));
}

function* updateCurrentOrganizationId({ payload }) {
  const result = yield call(API.put, '/users/' + payload.user.id + '/current_organization_id', { user: payload.user });
  yield put(userActions.updatedCurrentOrganizationId(result.get('user')));
}

function* resendEmail({ payload }) {
  yield call(API.put, `/users/${payload.id}/resend`, {});
  yield put(toastActions.showToast('確認メールを再送信しました', 'success'));
}

export function* userSagas() {
  yield all([
    takeLatest(actionTypes.ADD_USER, withLoading(addUser)),
    takeLatest(actionTypes.UPDATE_USER, withLoading(updateUser)),
    takeLatest(actionTypes.REMOVE_USER, withLoading(removeUser)),
    takeLatest(actionTypes.RESTORE_USER, withLoading(restoreUser)),
    takeLatest(actionTypes.UPDATE_PASSWORD, withLoading(updatePassword)),
    takeLatest(actionTypes.UPDATE_CURRENT_ORGANIZATION_ID, withLoading(updateCurrentOrganizationId)),
    takeLatest(actionTypes.RESEND_EMAIL, withLoading(resendEmail)),
  ]);
}
