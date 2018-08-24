import { fork } from 'redux-saga/effects'
import { objectiveSagas } from './objectives'
import { keyResultSagas } from './keyResults'
import { userSagas } from './users'
import { deviseSagas } from './devise'
import { organizationSagas } from './organization'
import { okrPeriodSagas } from './okrPeriods'
import { dialogSagas } from './dialogs'
import { loginUserSagas } from './loginUser'
import { currentSagas } from './current'

const sagas = [
  objectiveSagas,
  keyResultSagas,
  userSagas,
  deviseSagas,
  organizationSagas,
  okrPeriodSagas,
  dialogSagas,
  loginUserSagas,
  currentSagas,
]

export default function* rootSaga() {
  yield sagas.map(saga => fork(saga))
}
