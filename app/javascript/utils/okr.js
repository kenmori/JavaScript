import avatar_image from '../images/avatar.png';

export const OkrTypes = {
  TASK: 'task',
  OBJECTIVE: 'objective',
  KEY_RESULT: 'keyResult'
}

// O/KR 選択ドロップダウンに指定する O/KR 一覧データを返す
export const okrOptions = (okrs, withNone) => {
  let options = okrs.map(okr => ({
    key: okr.get('id'),
    value: okr.get('id'),
    text: okr.get('name'),
    image: { avatar: true, src: okr.get('owner').get('avatarUrl') || avatar_image },
  }));
  if (withNone) { // なしの選択肢を追加
    options = options.insert(0, ({
      key: -1,
      value: -1,
      text: 'なし',
    }));
  }
  return options.toArray();
}

const getParentObjective = (objective, entities) => {
  const parentKeyResultId = objective.get('parentKeyResultId')
  if (parentKeyResultId) {
    const parentKeyResult = entities.keyResults.get(parentKeyResultId)
    if (parentKeyResult) {
      return entities.objectives.get(parentKeyResult.get('objectiveId'))
    }
  }
  return null
}

export const isMyChildObjective = (objective, ownerId, entities) => {
  const parentObjective = getParentObjective(objective, entities)
  return parentObjective ? parentObjective.get('owner').get('id') === ownerId : false
}

export const isMyChildObjectiveById = (objectiveId, ownerId, entities) => {
  const objective = entities.objectives.get(objectiveId)
  return isMyChildObjective(objective, ownerId, entities)
}

export const isMyKeyResult = (keyResult, ownerId) => {
  const objective = keyResult.get('objective')
  return objective ? objective.get('owner').get('id') === ownerId : false
}

export const isMembersKeyResult = (keyResult, ownerId) => {
  return keyResult.get('owner').get('id') !== ownerId
}

export const isMembersKeyResultById = (keyResultId, ownerId, entities) => {
  const keyResult = entities.keyResults.get(keyResultId)
  return isMembersKeyResult(keyResult, ownerId)
}
