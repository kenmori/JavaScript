import { all, put, take, takeLatest } from 'redux-saga/effects';
import objectiveActions from '../actions/objectives';
import dialogActions from '../actions/dialogs';
import actionTypes from '../constants/actionTypes';
import withLoading from '../utils/withLoading';
import history from '../utils/history';

function* openOkrModal({ payload }) {
  const { objectiveId, keyResultId, hasObjectiveId, hasKeyResultId } = payload;

  function* fetchObjective() {
    yield put(objectiveActions.fetchObjective(objectiveId, keyResultId));
    const action = yield take([actionTypes.FETCHED_OBJECTIVE, actionTypes.FETCHED_OBJECTIVE_ERROR]);
    if (action.type === actionTypes.FETCHED_OBJECTIVE) {
      yield put(dialogActions.openedOkrModal(objectiveId, keyResultId));
    } else {
      yield openErrorModal();
    }
  }

  function* openErrorModal() {
    yield put(dialogActions.openErrorModal({
      message: '指定された OKR は存在しません',
      onCloseBefore: () => history.push('/'),
    }));
  }

  if (objectiveId) {
    if (hasObjectiveId && (!keyResultId || hasKeyResultId)) {
      yield put(dialogActions.openedOkrModal(objectiveId, keyResultId));
    } else {
      yield fetchObjective();
    }
  } else if (keyResultId) {
    yield fetchObjective();
  } else {
    yield openErrorModal();
  }
}

export function* dialogSagas() {
  yield all([
    takeLatest(actionTypes.OPEN_OKR_MODAL, withLoading(openOkrModal)),
  ]);
}
