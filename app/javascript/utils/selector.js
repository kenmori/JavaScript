import { createSelector } from 'reselect'
import {
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
