import { fork } from 'redux-saga/effects';
import { objectiveSagas } from './objectives';
import { keyResultSagas } from './keyResults';

const sagas = [
  objectiveSagas,
  keyResultSagas
];

export default function* rootSaga() {
  yield sagas.map(saga => fork(saga));
}


