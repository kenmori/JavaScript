export const sortObjectives = (objectives, order) => getSortedObjectives('id', objectives, order);

export const sortChildKeyResults = (objective, order = null) => {
  const keyResults = objective.get('keyResults');
  order = Array.isArray(order) ? order : order ? JSON.parse(order) : null;
  const keyResultOrder = order || JSON.parse(objective.get('keyResultOrder') || "[]");
  return objective.merge({
    keyResults: getSortedKeyResults(keyResults, keyResultOrder)
  })
}

export const sortChildObjectives = (objectives, order) => getSortedObjectives('parentKeyResultId', objectives, order);

export const createOrderData = (list) => JSON.stringify(list.map(c => c.get('id')).toArray());

const getSortedObjectives = (key, objectives, order) => {
  order = order || "[]";
  return objectives.sortBy((o) => JSON.parse(order).indexOf(o.get(key)));
}

const getSortedKeyResults = (keyResults, order) => {
  return keyResults.sortBy((o) => order.indexOf(o.get('id')));
}
