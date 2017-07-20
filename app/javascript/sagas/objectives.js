import { all, call, put, takeLatest } from 'redux-saga/effects';
import API from '../utils/api';
import objectiveActions from '../actions/objectives';
import dialogActions from '../actions/dialogs';
import actions from '../actions/objectives';
import actionTypes from '../constants/actionTypes';

function* fetchObjectives() {
  const result = yield call(API.get, '/objectives');
  yield put(objectiveActions.fetchedObjectives(result.get('objectives')));
}

function* addObjective({ payload }) {
  const result = yield call(API.post, '/objectives', { objective: payload.objective });
  yield put(objectiveActions.addedObjective(result.get('objective')));
  yield put(dialogActions.closeObjectiveFormModal());
  if (payload.isOpenKeyResultModal) {
    yield put(dialogActions.openKeyResultFormModal(result.get('objective')));
  }
}

function* updateObjective({payload}) {
  const result = yield call(API.put, '/objectives/' + payload.objective.id, payload);
  yield put(objectiveActions.updatedObjective(result.get('objective')));
  yield put(dialogActions.closeObjectiveFormModal());
}

function* removeObjective({payload}) {
  yield call(API.delete, '/objectives/' + payload.id);
  yield put(actions.removedObjective(payload.id));
}

export function *objectiveSagas() {
  yield all([
    takeLatest(actionTypes.FETCH_OBJECTIVES, fetchObjectives),
    takeLatest(actionTypes.ADD_OBJECTIVE, addObjective),
    takeLatest(actionTypes.UPDATE_OBJECTIVE, updateObjective),
    takeLatest(actionTypes.REMOVE_OBJECTIVE, removeObjective),
  ]);
}
