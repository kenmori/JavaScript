import { fromJS } from 'immutable';
import { schema, normalize } from 'normalizr';

const keyResultSchema = new schema.Entity('keyResults');
const objectiveSchema = new schema.Entity('objectives');
const objectiveListSchema = [objectiveSchema];
const keyResultListSchema = [keyResultSchema];

keyResultSchema.define({});

objectiveSchema.define({
  keyResults: keyResultListSchema,
  childObjectives: objectiveListSchema,
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
  // Immutable オブジェクトだと公式の denormalize() が使えないため自力で denormalize する
  return objective
    .set('parentObjective', getObjective(objective.get('parentObjectiveId'), entities))
    .set('parentKeyResult', getKeyResult(objective.get('parentKeyResultId'), entities))
    .update('keyResults', ids => ids.map(id => getKeyResult(id, entities)))
    .update('childObjectives', ids => ids.map(id => denormalizeObjective(id, entities)));
}

function denormalizeObjectives(objectiveIds, entities) {
  return objectiveIds.map(id => denormalizeObjective(id, entities));
}

function denormalizeKeyResult(keyResultId, entities) {
  const keyResult = getKeyResult(keyResultId, entities);
  if (!keyResult) return null;
  // Immutable オブジェクトだと公式の denormalize() が使えないため自力で denormalize する
  return keyResult
    .set('objective', denormalizeObjective(keyResult.get('objectiveId'), entities));
}

function denormalizeKeyResults(keyResultIds, entities) {
  return keyResultIds.map(id => denormalizeKeyResult(id, entities));
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
