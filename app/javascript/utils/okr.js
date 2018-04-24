import { List } from 'immutable';

// Objective の上位 KR 候補一覧を返す
export const getParentKeyResultCandidates = (state, parentKeyResultId) => {
  const candidates = state.keyResults.get('candidates');
  if (parentKeyResultId) {
    if (candidates.find(keyResult => keyResult.get('id') === parentKeyResultId)) {
      return candidates;
    }
    // 候補一覧に紐付く上位 KR が存在しない場合は含める
    const parentKeyResult = state.entities.keyResults.get(parentKeyResultId);
    if (parentKeyResult) {
      return candidates.push(parentKeyResult);
    }
  }
  return List();
}

// KR に紐付く Objective 候補一覧を返す
// - 管理者 => 全 O
// - O 責任者 => 自分の O のみ
// - その他 => 他人の O のみ
export const getObjectiveCandidates = (state, objectiveId) => {
  const candidates = state.objectives.get('candidates');
  if (objectiveId) {
    if (candidates.find(objective => objective.get('id') === objectiveId)) {
      return candidates;
    }
    // 候補一覧に紐付く Objective が存在しない場合は含める
    const objective = state.entities.objectives.get(objectiveId);
    if (objective) {
      return candidates.push(objective);
    }
  }
  return List();
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
