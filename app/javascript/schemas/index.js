import { fromJS } from 'immutable';
import { schema, normalize } from 'normalizr';

const keyResultSchema = new schema.Entity('keyResults');
const objectiveSchema = new schema.Entity('objectives');
const objectiveListSchema = [objectiveSchema];
const keyResultListSchema = [keyResultSchema];

keyResultSchema.define({
  objective: objectiveSchema,
  childObjectives: objectiveListSchema,
  connectedObjectives: objectiveListSchema,
  detachedObjective: objectiveSchema,
});

objectiveSchema.define({
  parentObjective: objectiveSchema,
  parentKeyResult: keyResultSchema,
  keyResults: keyResultListSchema,
  childObjectives: objectiveListSchema,
  connectedKeyResults: keyResultListSchema,
  detachedParentKeyResult: keyResultSchema,
});

function normalizeObjective(objective) {
  return fromJS(normalize([objective.toJSON()], objectiveListSchema));
}

function normalizeObjectives(objectives) {
  return fromJS(normalize(objectives.toJSON(), objectiveListSchema));
}

function normalizeKeyResult(keyResult) {
  return fromJS(normalize([keyResult.toJSON()], keyResultListSchema));
}

function normalizeKeyResults(keyResults) {
  return fromJS(normalize(keyResults.toJSON(), keyResultListSchema));
}

function getObjective(objectiveId, entities) {
  return entities.objectives.get(objectiveId);
}

function getKeyResult(keyResultId, entities) {
  return entities.keyResults.get(keyResultId);
}

function denormalizeObjective(objectiveId, entities) {
  const objective = getObjective(objectiveId, entities);
  if (!objective) return null;
  return objective
    .set('parentKeyResult', getKeyResult(objective.get('parentKeyResultId'), entities))
    .update('keyResults', ids => ids.map(id => denormalizeKeyResult(id, entities, objective)));
}

function denormalizeObjectives(objectiveIds, entities) {
  return objectiveIds.map(objectiveId => {
    const objective = getObjective(objectiveId, entities);
    return objective
      .update('keyResults', ids => ids.map(id => getKeyResult(id, entities)));
  });
}

function denormalizeKeyResult(keyResultId, entities, objective) {
  const keyResult = getKeyResult(keyResultId, entities);
  if (!keyResult) return null;
  return keyResult
    .set('objective', objective || getObjective(keyResult.get('objectiveId'), entities))
    .set('childObjectives', keyResult.get('childObjectiveIds').map(id => getObjective(id, entities)).filter(value => !!value));
}

function denormalizeKeyResults(keyResultIds, entities) {
  return keyResultIds.map(keyResultId => {
    const keyResult = getKeyResult(keyResultId, entities);
    return keyResult
      .set('objective', getObjective(keyResult.get('objectiveId'), entities));
  });
}

function denormalizeDeepObjective(objectiveId, entities, parentObjective) {
  const objective = getObjective(objectiveId, entities);
  if (!objective) return null;
  // KR 経由で子の Objective ID を取得する
  const childObjectiveIds = objective.get('keyResults').flatMap(id => getKeyResult(id, entities).get('childObjectiveIds'));
  // Immutable オブジェクトだと公式の denormalize() が使えないため自力で denormalize する
  return objective
    .set('parentObjective', parentObjective || denormalizeDeepObjective(objective.get('parentObjectiveId'), entities))
    .set('parentKeyResult', getKeyResult(objective.get('parentKeyResultId'), entities))
    .update('keyResults', ids => denormalizeDeepKeyResults(ids, entities, objective))
    .set('childObjectives', denormalizeDeepObjectives(childObjectiveIds, entities, objective).filter(value => !!value));
}

function denormalizeDeepObjectives(objectiveIds, entities, parentObjective) {
  return objectiveIds.map(id => denormalizeDeepObjective(id, entities, parentObjective));
}

function denormalizeDeepKeyResult(keyResultId, entities, objective) {
  const keyResult = getKeyResult(keyResultId, entities);
  if (!keyResult) return null;
  // Immutable オブジェクトだと公式の denormalize() が使えないため自力で denormalize する
  return keyResult
    .set('objective', objective || denormalizeDeepObjective(keyResult.get('objectiveId'), entities))
    .set('childObjectives', keyResult.get('childObjectiveIds').map(id => getObjective(id, entities)).filter(value => !!value));
}

function denormalizeDeepKeyResults(keyResultIds, entities, objective) {
  return keyResultIds.map(id => denormalizeDeepKeyResult(id, entities, objective));
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
};
