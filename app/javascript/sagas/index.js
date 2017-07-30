import { fork } from 'redux-saga/effects';
import { objectiveSagas } from './objectives';
import { keyResultSagas } from './keyResults';
import { sessionSagas } from './sessions';

const sagas = [
  objectiveSagas,
  keyResultSagas,
  sessionSagas
];

export default function* rootSaga() {
  yield sagas.map(saga => fork(saga));
}


