import { denormalizeObjectives, denormalizeObjectiveCandidates, denormalizeKeyResultCandidates } from '../schemas/index'
import avatar_image from '../images/avatar.png';

// 孤立 (親のいない) Objective 一覧を返す
export const getIsolatedObjectives = state => {
  return denormalizeObjectives(state.objectives.get('ids'), state.entities)
    .filter(objective => !objective.get('parentKeyResultId'))
}

// Objective の上位 KR 候補一覧を返す
export const getParentKeyResultCandidates = (state, parentKeyResultId) => {
  const candidates = denormalizeKeyResultCandidates(state.keyResults.get('candidates'), state.candidates);
  if (parentKeyResultId && !candidates.find(keyResult => keyResult.get('id') === parentKeyResultId)) {
    // 候補一覧に紐付く上位 KR が存在しない場合は含める
    const parentKeyResult = state.entities.keyResults.get(parentKeyResultId);
    if (parentKeyResult) {
      return candidates.push(parentKeyResult);
    }
  }
  return candidates;
}

// KR に紐付く Objective 候補一覧を返す
// - 管理者 => 全 O
// - O 責任者 => 自分の O のみ
// - その他 => 他人の O のみ
export const getObjectiveCandidates = (state, objectiveId) => {
  const candidates = denormalizeObjectiveCandidates(state.objectives.get('candidates'), state.candidates);
  if (objectiveId && !candidates.find(objective => objective.get('id') === objectiveId)) {
    // 候補一覧に紐付く Objective が存在しない場合は含める
    const objective = state.entities.objectives.get(objectiveId);
    if (objective) {
      return candidates.push(objective);
    }
  }
  return candidates;
}

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
