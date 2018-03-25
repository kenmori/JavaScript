export const sortKeyResult = (objective) => {
  const keyResults = objective.get('keyResults');
  const keyResultOrder = JSON.parse(objective.get('keyResultOrder') || "[]");
  return objective.merge({
    keyResults: getSortedKeyResults(keyResults, keyResultOrder)
  })
}

export const sortKeyResultAll = (objectives) => {
  return objectives.map(objective => sortKeyResult(objective))
}

export const createOrderData = (list) => JSON.stringify(list.map(c => c.get('id')).toArray());

const getSortedKeyResults = (keyResults, order) => {
  const sortedList = order.map(id => (
    keyResults.find(o => o.get('id') === id)
  )).filter(Boolean);
  const addList = keyResults.filter((item) => {
    return !sortedList.find(o => o.get('id') === item.get('id'));
  });
  return addList.concat(sortedList);
}
