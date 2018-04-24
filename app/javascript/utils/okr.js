import { List } from 'immutable';

// Objective の上位 KR 候補一覧を返す
// - 管理者 => 全 KR
// - O 責任者 => 自分の KR (責任者＆関係者) のみ
// - その他 => 他人の上位 KR のみ
export const getParentKeyResultCandidates = (state, parentKeyResultId, objectiveOwnerId = null) => {
  const loginUserId = state.loginUser.get('id');
  const isAdmin = state.loginUser.get('isAdmin');
  const isObjectiveOwner = objectiveOwnerId === loginUserId;

  if (isAdmin || isObjectiveOwner) {
    return state.keyResults.get('candidates');
  } else {
    return parentKeyResultId ? List.of(state.entities.keyResults.get(parentKeyResultId)) : List();
  }
}

// KR に紐付く Objective 候補一覧を返す
// - 管理者 => 全 O
// - O 責任者 => 自分の O のみ
// - その他 => 他人の O のみ
export const getObjectiveCandidates = (state, objectiveId, objectiveOwnerId = null) => {
  const loginUserId = state.loginUser.get('id');
  const isAdmin = state.loginUser.get('isAdmin');
  const isObjectiveOwner = objectiveOwnerId === loginUserId;

  if (isAdmin || isObjectiveOwner) {
    return state.objectives.get('candidates');
  } else {
    return objectiveId ? List.of(state.entities.objectives.get(objectiveId)) : List();
  }
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
