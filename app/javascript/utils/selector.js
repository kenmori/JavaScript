import { createSelector } from 'reselect'
import {
  denormalizeDeepObjective,
  denormalizeObjectives, denormalizeKeyResults,
} from '../schemas'

export const getEnabledUsers = createSelector(
  state => state.users,
  users => users.filter(user => !user.get('disabled'))
)

export const getObjectives = createSelector(
  state => state.objectives.get('ids'),
  state => state.entities,
  (objectiveIds, entities) => denormalizeObjectives(objectiveIds, entities)
)

export const getKeyResults = createSelector(
  state => state.keyResults.get('ids'),
  state => state.entities,
  (keyResultIds, entities) => denormalizeKeyResults(keyResultIds, entities)
)

export const getPreviousObjectives = createSelector(
  state => state.objectives.get('previousIds'),
  state => state.entities,
  (objectiveIds, entities) => denormalizeObjectives(objectiveIds, entities)
)

// 孤立 (親のいない) Objective 一覧を返す
export const getIsolatedObjectives = createSelector(
  state => state.objectives.get('ids'),
  state => state.entities,
  (objectiveIds, entities) => denormalizeObjectives(objectiveIds, entities)
    .filter(objective => !objective.get('parentKeyResultId'))
)

export const getSelectedObjective = createSelector(
  state => state.objectives.getIn(['selectedOkr', 'objectiveId']),
  state => state.entities,
  (selectedId, entities) => denormalizeDeepObjective(selectedId, entities)
)
