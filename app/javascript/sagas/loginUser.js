import { all, put, select, takeLatest } from 'redux-saga/effects'
import call from '../utils/call'
import API from '../utils/api'
import withLoading from '../utils/withLoading'
import loginUserActions from '../actions/loginUser'
import dialogActions from '../actions/dialogs'
import ActionTypes from '../constants/actionTypes'

function* updateUserSetting({ payload }) {
  const userId = yield select(state => state.loginUser.get('id'))
  const result = yield call(API.put, `/users/${userId}/user_setting`, { userSetting: payload.userSetting })
  yield put(loginUserActions.updatedUserSetting(result))
  yield put(dialogActions.closeOptionModal())
}

function* updateObjectiveOrder({ payload }) {
  const [userId, okrPeriodId] = yield select(state => [state.current.get('userId'), state.current.get('okrPeriodId')])
  const objectiveOrder = { userId, okrPeriodId, list: JSON.stringify(payload.order) }
  const result = yield call(API.put, '/objective_orders', { objectiveOrder })
  yield put(loginUserActions.updatedObjectiveOrder(result.get('list')))
}

export function* loginUserSagas() {
  yield all([
    takeLatest(ActionTypes.UPDATE_USER_SETTING, withLoading(updateUserSetting)),
    takeLatest(ActionTypes.UPDATE_OBJECTIVE_ORDER, withLoading(updateObjectiveOrder)),
  ])
}
