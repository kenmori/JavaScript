import { fork } from 'redux-saga/effects';
import { objectiveSagas } from './objectives';
import { keyResultSagas } from './keyResults';
import { userSagas } from './users';
import { okrSettingSagas } from './okrSettings';
import { sessionSagas } from './sessions';
import { okrPeriodSagas } from './okrPeriods';

const sagas = [
  objectiveSagas,
  keyResultSagas,
  userSagas,
  okrSettingSagas,
  sessionSagas,
  okrPeriodSagas,
];

export default function* rootSaga() {
  yield sagas.map(saga => fork(saga));
}


