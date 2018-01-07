import { schema } from 'normalizr';

const keyResultSchema = new schema.Entity('keyResults');
const objectiveSchema = new schema.Entity('objectives');
objectiveSchema.define({
  childObjectives: [objectiveSchema],
  keyResults: [keyResultSchema]
});
const objectiveListSchema = [objectiveSchema];
const keyResultListSchema = [keyResultSchema];

function denormalizeObjective(objective, entities) {
  return objective
    .set('keyResults', objective.get('keyResults').map((keyResultId) => {
      return entities.keyResults.get(keyResultId)
    }))
    .set('childObjectives', objective.get('childObjectives').map((childObjectiveId) => {
      if (childObjectiveId) {
        return denormalizeObjective(entities.objectives.get(childObjectiveId), entities);
      } else {
        return undefined;
      }
    }));
}

function denormalizeObjectives(state) {
  return state.objectives.map((objectiveId) => {
    return denormalizeObjective(state.entities.objectives.get(objectiveId), state.entities)
  });
}

function denormalizeKeyResult(keyResult, entities) {
  return keyResult
    .set('objective', denormalizeObjective(entities.objectives.get(keyResult.get('objectiveId')), entities));
}

function denormalizeKeyResults(state) {
  return state.keyResults.map((keyResultId) => {
    return denormalizeKeyResult(state.entities.keyResults.get(keyResultId), state.entities)
  });
}

export {
  objectiveListSchema,
  keyResultListSchema,
  denormalizeObjective,
  denormalizeObjectives,
  denormalizeKeyResult,
  denormalizeKeyResults,
};

