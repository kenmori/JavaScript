import { schema } from 'normalizr';

const keyResultSchema = new schema.Entity('keyResults');
const objectiveSchema = new schema.Entity('objectives');
keyResultSchema.define({
  objective: objectiveSchema,
});
objectiveSchema.define({
  childObjectives: [objectiveSchema],
  keyResults: [keyResultSchema]
});
const objectiveListSchema = [objectiveSchema];
const keyResultListSchema = [keyResultSchema];

function denormalizeObjective(objective, entities) {
  if (!objective) return null;
  return objective
    .set('parentObjective', entities.objectives.get(objective.get('parentObjectiveId')))
    .set('parentKeyResult', entities.keyResults.get(objective.get('parentKeyResultId')))
    .update('keyResults', ids => ids.map(id => entities.keyResults.get(id)).filter(value => !!value))
    .update('childObjectives', ids => ids.map(id => denormalizeObjective(entities.objectives.get(id), entities)));
}

function denormalizeObjectives(objectives, entities) {
  return objectives
    .map(id => denormalizeObjective(entities.objectives.get(id), entities));
}

function denormalizeKeyResult(keyResult, entities) {
  if (!keyResult) return null;
  return keyResult
    .set('objective', denormalizeObjective(entities.objectives.get(keyResult.get('objectiveId')), entities));
}

function denormalizeKeyResults(keyResults, entities) {
  return keyResults
    .map(id => denormalizeKeyResult(entities.keyResults.get(id), entities));
}

export {
  objectiveListSchema,
  keyResultListSchema,
  denormalizeObjective,
  denormalizeObjectives,
  denormalizeKeyResult,
  denormalizeKeyResults,
};
