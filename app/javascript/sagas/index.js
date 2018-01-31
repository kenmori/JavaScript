import { fork } from 'redux-saga/effects';
import { okrSagas } from './okrs';
import { objectiveSagas } from './objectives';
import { keyResultSagas } from './keyResults';
import { userSagas } from './users';
import { sessionSagas } from './sessions';
import { organizationSagas } from './organizations';
import { okrPeriodSagas } from './okrPeriods';

const sagas = [
  okrSagas,
  objectiveSagas,
  keyResultSagas,
  userSagas,
  sessionSagas,
  organizationSagas,
  okrPeriodSagas,
];

export default function* rootSaga() {
  yield sagas.map(saga => fork(saga));
}
