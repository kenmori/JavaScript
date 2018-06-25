import { fork } from 'redux-saga/effects';
import { objectiveSagas } from './objectives';
import { keyResultSagas } from './keyResults';
import { userSagas } from './users';
import { deviseSagas } from './devise';
import { organizationSagas } from './organizations';
import { okrPeriodSagas } from './okrPeriods';
import { dialogSagas } from './dialogs';
import { objectiveOrderSagas } from "./objectiveOrders";
import { loginUserSagas } from './loginUser'

const sagas = [
  objectiveSagas,
  keyResultSagas,
  userSagas,
  deviseSagas,
  organizationSagas,
  okrPeriodSagas,
  dialogSagas,
  objectiveOrderSagas,
  loginUserSagas,
];

export default function* rootSaga() {
  yield sagas.map(saga => fork(saga));
}
