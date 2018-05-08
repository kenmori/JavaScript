import avatar_image from '../images/avatar.png';

// Objective 並び替えが可能かどうか
// - 選択ユーザー = ログインユーザー = Objective 責任者 => true
// - その他 => false
// ※ 選択ユーザーと Objective 一覧の更新タイミングのずれを吸収するために用いる
export const canMoveObjective = state => {
  const currentUserId = state.current.get('userId');
  const loginUserId = state.loginUser.get('id');
  if (currentUserId === loginUserId) {
    const objective = state.entities.objectives.get(state.objectives.get('ids').first());
    if (objective) {
      const objectiveOwnerId = objective.get('owner').get('id');
      return currentUserId === objectiveOwnerId;
    }
  }
  return false;
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
