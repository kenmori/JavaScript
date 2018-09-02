import { fromJS } from 'immutable'
import { schema, normalize } from 'normalizr'

const keyResultSchema = new schema.Entity('keyResults')
const objectiveSchema = new schema.Entity('objectives')
const objectiveListSchema = [objectiveSchema]
const keyResultListSchema = [keyResultSchema]

keyResultSchema.define({
  objective: objectiveSchema,
  childObjectives: objectiveListSchema,
  connectedObjectives: objectiveListSchema,
  detachedObjective: objectiveSchema,
  descendantObjectives: objectiveListSchema,
})

objectiveSchema.define({
  parentObjective: objectiveSchema,
  parentKeyResult: keyResultSchema,
  keyResults: keyResultListSchema,
  childObjectives: objectiveListSchema,
  connectedKeyResults: keyResultListSchema,
  detachedParentKeyResult: keyResultSchema,
  descendantObjectives: objectiveListSchema,
})

function normalizeObjective(objective) {
  return fromJS(normalize([objective.toJSON()], objectiveListSchema))
}

function normalizeObjectives(objectives) {
  return fromJS(normalize(objectives.toJSON(), objectiveListSchema))
}

function normalizeKeyResult(keyResult) {
  return fromJS(normalize([keyResult.toJSON()], keyResultListSchema))
}

function normalizeKeyResults(keyResults) {
  return fromJS(normalize(keyResults.toJSON(), keyResultListSchema))
}

function getObjective(objectiveId, entities) {
  return entities.objectives.get(objectiveId)
}

function getKeyResult(keyResultId, entities) {
  return entities.keyResults.get(keyResultId)
}

function denormalizeObjective(objectiveId, showDisabledOkrs, entities) {
  const objective = getObjective(objectiveId, entities)
  if (!objective) return null
  const keyResults = objective.get('keyResultIds').map(id => denormalizeKeyResult(id, entities, objective)).filter(value => !!value)
  return objective
    .set('parentKeyResult', denormalizeKeyResult(objective.get('parentKeyResultId'), entities))
    .set('keyResults', keyResults)
    .set('enabledKeyResults', showDisabledOkrs ? keyResults : keyResults.filter(keyResult => !keyResult.get('disabled')))
}

function denormalizeObjectives(objectiveIds, showDisabledOkrs, entities) {
  const objectives = objectiveIds.map(objectiveId => {
    const objective = getObjective(objectiveId, entities)
    if (!objective) return null
    const keyResults = objective.get('keyResultIds').map(id => getKeyResult(id, entities)).filter(value => !!value)
    return objective
      .set('keyResults', showDisabledOkrs ? keyResults : keyResults.filter(keyResult => !keyResult.get('disabled')))
  })
  return showDisabledOkrs ? objectives : objectives.filter(objective => !objective.get('disabled'))
}

function denormalizeKeyResult(keyResultId, entities, objective) {
  const keyResult = getKeyResult(keyResultId, entities)
  if (!keyResult) return null
  return keyResult
    .set('objective', objective || getObjective(keyResult.get('objectiveId'), entities))
    .set('childObjectives', keyResult.get('childObjectiveIds').map(id => getObjective(id, entities)).filter(value => !!value))
}

function denormalizeKeyResults(keyResultIds, showDisabledOkrs, entities) {
  const keyResults = keyResultIds.map(keyResultId => {
    const keyResult = getKeyResult(keyResultId, entities)
    if (!keyResult) return null
    return keyResult
      .set('objective', getObjective(keyResult.get('objectiveId'), entities))
  })
  return showDisabledOkrs ? keyResults : keyResults.filter(keyResult => !keyResult.get('disabled'))
}

function denormalizeDeepObjective(objectiveId, showDisabledOkrs, entities, parentKeyResult) {
  const objective = getObjective(objectiveId, entities)
  if (!objective) return null
  // Immutable オブジェクトだと公式の denormalize() が使えないため自力で denormalize する
  parentKeyResult = parentKeyResult || denormalizeDeepKeyResult(objective.get('parentKeyResultId'), showDisabledOkrs, entities)
  if (!showDisabledOkrs && parentKeyResult && parentKeyResult.get('disabled')) {
    parentKeyResult = null
  }
  let keyResultIds = objective.get('keyResultIds')
  if (!showDisabledOkrs) {
    keyResultIds = keyResultIds.filter(keyResultId => {
      const keyResult = getKeyResult(keyResultId, entities)
      return !keyResult || !keyResult.get('disabled')
    })
  }
  return objective
    .set('parentKeyResultId', parentKeyResult ? parentKeyResult.get('id') : null)
    .set('parentKeyResult', parentKeyResult)
    .set('keyResultIds', keyResultIds)
    .set('keyResults', denormalizeDeepKeyResults(keyResultIds, showDisabledOkrs, entities, objective))
}

function denormalizeDeepObjectives(objectiveIds, showDisabledOkrs, entities, parentKeyResult) {
  return objectiveIds.map(id => denormalizeDeepObjective(id, showDisabledOkrs, entities, parentKeyResult)).filter(value => !!value)
}

function denormalizeDeepKeyResult(keyResultId, showDisabledOkrs, entities, objective) {
  const keyResult = getKeyResult(keyResultId, entities)
  if (!keyResult) return null
  // Immutable オブジェクトだと公式の denormalize() が使えないため自力で denormalize する
  let childObjectiveIds = keyResult.get('childObjectiveIds')
  if (!showDisabledOkrs) {
    childObjectiveIds = childObjectiveIds.filter(objectiveId => {
      const objective = getObjective(objectiveId, entities)
      return !objective || !objective.get('disabled')
    })
  }
  return keyResult
    .set('objective', objective || denormalizeDeepObjective(keyResult.get('objectiveId'), showDisabledOkrs, entities))
    .set('childObjectiveIds', childObjectiveIds)
    .set('childObjectives', denormalizeDeepObjectives(childObjectiveIds, showDisabledOkrs, entities, keyResult))
}

function denormalizeDeepKeyResults(keyResultIds, showDisabledOkrs, entities, objective) {
  return keyResultIds.map(id => denormalizeDeepKeyResult(id, showDisabledOkrs, entities, objective)).filter(value => !!value)
}

function denormalizeObjectiveCandidates(objectiveIds, showDisabledOkrs, entities) {
  const objectives = objectiveIds.map(objectiveId => getObjective(objectiveId, entities))
  return showDisabledOkrs ? objectives : objectives.filter(objective => !objective.get('disabled'))
}

function denormalizeKeyResultCandidates(keyResultIds, showDisabledOkrs, entities) {
  const keyResults = keyResultIds.map(keyResultId => getKeyResult(keyResultId, entities))
  return showDisabledOkrs ? keyResults : keyResults.filter(keyResult => !keyResult.get('disabled'))
}

export {
  normalizeObjective,
  normalizeObjectives,
  normalizeKeyResult,
  normalizeKeyResults,
  denormalizeObjective,
  denormalizeObjectives,
  denormalizeKeyResult,
  denormalizeKeyResults,
  denormalizeDeepObjective,
  denormalizeObjectiveCandidates,
  denormalizeKeyResultCandidates,
}
