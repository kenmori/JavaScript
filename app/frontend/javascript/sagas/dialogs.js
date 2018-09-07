import { all, put, take, takeLatest, select } from 'redux-saga/effects'
import objectiveActions from '../actions/objectives'
import dialogActions from '../actions/dialogs'
import actionTypes from '../constants/actionTypes'
import withLoading from '../utils/withLoading'
import history from '../utils/history'

function* openOkrModal({ payload: { objectiveId, keyResultId } }) {
  const entities = yield select(state => state.entities)
  if (keyResultId) {
    objectiveId = entities.keyResults.getIn([keyResultId, 'objectiveId'], null)
  }
  if (objectiveId) {
    const hasObjectiveId = entities.objectives.has(objectiveId)
    const hasKeyResultId = entities.keyResults.has(keyResultId)
    if (hasObjectiveId && (!keyResultId || hasKeyResultId)) {
      const currentObjectiveId = yield select(state => state.dialogs.getIn(['okrForm', 'objectiveId']))
      if (currentObjectiveId !== objectiveId) {
        yield put(objectiveActions.fetchObjectiveAsync(objectiveId, keyResultId))
      }
      yield put(dialogActions.openedOkrModal(objectiveId, keyResultId))
    } else {
      yield fetchObjective(objectiveId, keyResultId)
    }
  } else if (keyResultId) {
    yield fetchObjective(null, keyResultId)
  } else {
    yield openErrorModal()
  }
}

function* fetchObjective(objectiveId, keyResultId) {
  yield put(objectiveActions.fetchObjective(objectiveId, keyResultId))
  const action = yield take([actionTypes.FETCHED_OBJECTIVE, actionTypes.FETCHED_OBJECTIVE_ERROR])
  if (action.type === actionTypes.FETCHED_OBJECTIVE) {
    yield put(dialogActions.openedOkrModal(objectiveId, keyResultId))
  } else {
    yield openErrorModal()
  }
}

function* openErrorModal() {
  yield put(dialogActions.openErrorModal({
    message: '指定された OKR は存在しません',
    onCloseBefore: () => history.push('/'),
  }))
}

export function* dialogSagas() {
  yield all([
    takeLatest(actionTypes.OPEN_OKR_MODAL, withLoading(openOkrModal)),
  ])
}
