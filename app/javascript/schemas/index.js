import { schema, normalize } from 'normalizr';

const keyResultSchema = new schema.Entity('keyResults');
const objectiveSchema = new schema.Entity('objectives');
objectiveSchema.define({
  childObjectives: [objectiveSchema],
  keyResults: [keyResultSchema]
});
const objectiveListSchema = [objectiveSchema];

function denormalizeObjective(objective, entities) {
  const denormalizedObjective =  objective
    .set('keyResults', objective.get('keyResults').map((keyResultId) => {
      return entities.keyResults.get(keyResultId)
    }))
    .set('childObjectives', objective.get('childObjectives').map((childObjectiveId) => {
        if(childObjectiveId) {
          return denormalizeObjective(entities.objectives.get(childObjectiveId), entities);
        } else {
          return undefined;
        }
    }));
  return denormalizedObjective;
}

function denormalizeObjectives(state) {
  return state.objectives.map((objectiveId) => {
    return denormalizeObjective(state.entities.objectives.get(objectiveId), state.entities)
  });
}

export {
  objectiveListSchema,
  denormalizeObjective,
  denormalizeObjectives,
};

