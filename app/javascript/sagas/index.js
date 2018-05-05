import { fork } from 'redux-saga/effects';
import { objectiveSagas } from './objectives';
import { keyResultSagas } from './keyResults';
import { userSagas } from './users';
import { sessionSagas } from './sessions';
import { organizationSagas } from './organizations';
import { okrPeriodSagas } from './okrPeriods';
import { dialogSagas } from './dialogs';
import { objectiveOrderSagas } from "./objectiveOrders";

const sagas = [
  objectiveSagas,
  keyResultSagas,
  userSagas,
  sessionSagas,
  organizationSagas,
  okrPeriodSagas,
  dialogSagas,
  objectiveOrderSagas,
];

export default function* rootSaga() {
  yield sagas.map(saga => fork(saga));
}
