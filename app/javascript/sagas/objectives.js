import { all, call, put, takeLatest } from 'redux-saga/effects';
import API from '../utils/api';
import objectiveActions from '../actions/objectives';
import dialogActions from '../actions/dialogs';
import actions from '../actions/objectives';
import actionTypes from '../constants/actionTypes';
import withLoading from '../utils/withLoading';

function* fetchObjectives({payload}) {
  const result = yield call(API.get, '/objectives', { okrPeriodId: payload.okrPeriodId });
  yield put(objectiveActions.fetchedObjectives(result.get('objectives')));
}

function* addObjective({ payload }) {
  const result = yield call(API.post, '/objectives', { objective: payload.objective });
  yield put(objectiveActions.addedObjective(result.get('objective')));
  if (payload.isOpenKeyResultModal) {
    yield put(dialogActions.openKeyResultFormModal(result.get('objective')));
  }
}

function* updateObjective({payload}) {
  const result = yield call(API.put, '/objectives/' + payload.objective.id, payload);
  yield put(objectiveActions.updatedObjective(result.get('objective')));
}

function* removeObjective({payload}) {
  yield call(API.delete, '/objectives/' + payload.id);
  yield put(actions.removedObjective(payload.id));
}

export function *objectiveSagas() {
  yield all([
    takeLatest(actionTypes.FETCH_OBJECTIVES, withLoading(fetchObjectives)),
    takeLatest(actionTypes.ADD_OBJECTIVE, withLoading(addObjective)),
    takeLatest(actionTypes.UPDATE_OBJECTIVE, withLoading(updateObjective)),
    takeLatest(actionTypes.REMOVE_OBJECTIVE, withLoading(removeObjective)),
  ]);
}
