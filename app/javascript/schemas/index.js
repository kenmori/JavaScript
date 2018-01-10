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
    }))
    .set('parentKeyResult', entities.keyResults.get(objective.get('parentKeyResultId')))
    .set('parentObjective', entities.objectives.get(objective.get('parentObjectiveId')));
}

function denormalizeObjectives(state) {
  return state.objectives.map((objectiveId) => {
    return denormalizeObjective(state.entities.objectives.get(objectiveId), state.entities)
  });
}

function denormalizeKeyResult(keyResult, entities) {
  const objective = entities.objectives.get(keyResult.get('objectiveId'));
  if (objective) {
    return keyResult
      .set('objective', denormalizeObjective(objective, entities));
  } else {
    // FIXME: entities.objectives には自分の Objective しかないため他人が責任者の Objective を取得できない
    return keyResult;
  }
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
