const sortKeyResult = (objective) => {
  const keyResults = objective.get('keyResults');
  const keyResultOrder = [1, 17, 2];
  return objective.merge({
    keyResults: getSortedKeyResults(keyResults, keyResultOrder)
  })
}

const sortKeyResultAll = (objectives) => {
  return objectives.map(objective => sortKeyResult(objective))
}

const getSortedKeyResults = (keyResults, order) => {
  const sortedList = order.map(id => (
    keyResults.find(o => o.get('id') === id)
  )).filter(Boolean);
  const addList = keyResults.filter((item) => {
    return !sortedList.find(o => o.get('id') === item.get('id'));
  });
  return addList.concat(sortedList);
}

export {
  sortKeyResultAll,
  sortKeyResult
}