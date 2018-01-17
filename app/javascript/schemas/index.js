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

function denormalizeObjective(objectiveId, entities) {
  const objective = entities.objectives.get(objectiveId);
  if (!objective) return null;
  // Immutable オブジェクトだと公式の denormalize() が使えないため自力で denormalize する
  return objective
    .set('parentObjective', entities.objectives.get(objective.get('parentObjectiveId')))
    .set('parentKeyResult', entities.keyResults.get(objective.get('parentKeyResultId')))
    .update('keyResults', ids => ids.map(id => entities.keyResults.get(id)).filter(value => !!value))
    .update('childObjectives', ids => ids.map(id => denormalizeObjective(id, entities)));
}

function denormalizeObjectives(objectiveIds, entities) {
  return objectiveIds.map(id => denormalizeObjective(id, entities));
}

function denormalizeKeyResult(keyResultId, entities) {
  const keyResult = entities.keyResults.get(keyResultId);
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
