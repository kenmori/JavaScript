import { fork } from 'redux-saga/effects';
import { objectiveSagas } from './objectives';
import { keyResultSagas } from './keyResults';
import { userSagas } from './users';
import { sessionSagas } from './sessions';
import { organizationSagas } from './organizations';

const sagas = [
  objectiveSagas,
  keyResultSagas,
  userSagas,
  sessionSagas,
  organizationSagas,
];

export default function* rootSaga() {
  yield sagas.map(saga => fork(saga));
}
