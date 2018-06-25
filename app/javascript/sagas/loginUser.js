import { all, put, select, takeLatest } from 'redux-saga/effects'
import call from '../utils/call'
import API from '../utils/api'
import withLoading from '../utils/withLoading'
import userSettingActions from '../actions/loginUser'
import dialogActions from '../actions/dialogs'
import ActionTypes from '../constants/actionTypes'

function* updateUserSetting({ payload }) {
  const userId = yield select(state => state.loginUser.get('id'))
  const result = yield call(API.put, `/users/${userId}/user_setting`, { userSetting: payload.userSetting })
  yield put(userSettingActions.updatedUserSetting(result))
  yield put(dialogActions.closeOptionModal())
}

export function* loginUserSagas() {
  yield all([
    takeLatest(ActionTypes.UPDATE_USER_SETTING, withLoading(updateUserSetting)),
  ])
}
