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

function denormalizeObjective(objectiveId, entities, parentObjective) {
  const objective = getObjective(objectiveId, entities);
  if (!objective) return null;
  // Immutable オブジェクトだと公式の denormalize() が使えないため自力で denormalize する
  return objective
    .set('parentObjective', parentObjective || denormalizeObjective(objective.get('parentObjectiveId'), entities))
    .set('parentKeyResult', getKeyResult(objective.get('parentKeyResultId'), entities))
    .update('keyResults', ids => denormalizeKeyResults(ids, entities, objective))
    .set('childObjectives', denormalizeObjectives(objective.get('childObjectiveIds'), entities, objective).filter(value => !!value));
}

function denormalizeObjectives(objectiveIds, entities, parentObjective) {
  return objectiveIds.map(id => denormalizeObjective(id, entities, parentObjective));
}

function denormalizeKeyResult(keyResultId, entities, objective) {
  const keyResult = getKeyResult(keyResultId, entities);
  if (!keyResult) return null;
  // Immutable オブジェクトだと公式の denormalize() が使えないため自力で denormalize する
  return keyResult
    .set('objective', objective || denormalizeObjective(keyResult.get('objectiveId'), entities))
    .set('childObjectives', keyResult.get('childObjectiveIds').map(id => getObjective(id, entities)).filter(value => !!value));
}

function denormalizeKeyResults(keyResultIds, entities, objective) {
  return keyResultIds.map(id => denormalizeKeyResult(id, entities, objective));
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
};
