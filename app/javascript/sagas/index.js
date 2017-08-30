import { fork } from 'redux-saga/effects';
import { objectiveSagas } from './objectives';
import { keyResultSagas } from './keyResults';
import { userSagas } from './users';
import { sessionSagas } from './sessions';

const sagas = [
  objectiveSagas,
  keyResultSagas,
  userSagas,
  sessionSagas
];

export default function* rootSaga() {
  yield sagas.map(saga => fork(saga));
}


