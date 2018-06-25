import avatar_image from '../images/avatar.png';

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

export const getParentObjective = (objective, entities) => {
  const parentKeyResultId = objective.get('parentKeyResultId')
  if (parentKeyResultId) {
    const parentKeyResult = entities.keyResults.get(parentKeyResultId)
    if (parentKeyResult) {
      return entities.objectives.get(parentKeyResult.get('objectiveId'))
    }
  }
  return null
}
