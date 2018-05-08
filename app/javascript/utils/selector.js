import { createSelector } from 'reselect'
import {
  denormalizeObjective, denormalizeDeepObjective,
  denormalizeObjectives, denormalizeKeyResults,
  denormalizeObjectiveCandidates, denormalizeKeyResultCandidates,
} from '../schemas'

export const getEnabledUsers = createSelector(
  state => state.users,
  users => users.filter(user => !user.get('disabled'))
)

export const getObjectives = createSelector(
  state => state.objectives.get('ids'),
  state => state.entities,
  (objectiveIds, entities) => denormalizeObjectives(objectiveIds, entities)
)

export const getKeyResults = createSelector(
  state => state.keyResults.get('ids'),
  state => state.entities,
  (keyResultIds, entities) => denormalizeKeyResults(keyResultIds, entities)
)

export const getPreviousObjectives = createSelector(
  state => state.objectives.get('previousIds'),
  state => state.entities,
  (objectiveIds, entities) => denormalizeObjectives(objectiveIds, entities)
)

// 孤立 (親のいない) Objective 一覧を返す
export const getIsolatedObjectives = createSelector(
  state => state.objectives.get('ids'),
  state => state.entities,
  (objectiveIds, entities) => denormalizeObjectives(objectiveIds, entities)
    .filter(objective => !objective.get('parentKeyResultId'))
)

export const getSelectedObjective = createSelector(
  state => state.objectives.getIn(['selectedOkr', 'objectiveId']),
  state => state.entities,
  (selectedId, entities) => denormalizeDeepObjective(selectedId, entities)
)

export const getOkrModalObjective = createSelector(
  state => state.dialogs.getIn(['okrForm', 'objectiveId']),
  state => state.dialogs.getIn(['okrForm', 'keyResultId']),
  state => state.dialogs.getIn(['okrForm', 'removedKeyResultId']),
  state => state.entities,
  (modalObjectiveId, modalKeyResultId, removedKeyResultId, entities) => {
    const objectiveId = modalKeyResultId && modalKeyResultId !== removedKeyResultId
      ? entities.keyResults.getIn([modalKeyResultId, 'objectiveId']) // KR に紐付く Objective を指定する
      : modalObjectiveId
    return objectiveId && denormalizeObjective(objectiveId, entities)
  }
)

// Objective の上位 KR 候補一覧を返す
export const getParentKeyResultCandidates = createSelector(
  getOkrModalObjective,
  state => state.keyResults.get('candidateIds'),
  state => state.candidates,
  (modalObjective, keyResultIds, entities) => {
    const candidates = denormalizeKeyResultCandidates(keyResultIds, entities)
    const parentKeyResultId = modalObjective && modalObjective.get('parentKeyResultId')
    if (parentKeyResultId && !candidates.find(keyResult => keyResult.get('id') === parentKeyResultId)) {
      // 候補一覧に紐付く上位 KR が存在しない場合は含める
      const parentKeyResult = entities.keyResults.get(parentKeyResultId)
      if (parentKeyResult) {
        return candidates.push(parentKeyResult)
      }
    }
    return candidates
  }
)

// KR に紐付く Objective 候補一覧を返す
// - 管理者 => 全 O
// - O 責任者 => 自分の O のみ
// - その他 => 他人の O のみ
export const getObjectiveCandidates = createSelector(
  getOkrModalObjective,
  state => state.objectives.get('candidateIds'),
  state => state.candidates,
  (modalObjective, objectiveIds, entities) => {
    const candidates = denormalizeObjectiveCandidates(objectiveIds, entities)
    const objectiveId = modalObjective && modalObjective.get('id')
    if (objectiveId && !candidates.find(objective => objective.get('id') === objectiveId)) {
      // 候補一覧に紐付く Objective が存在しない場合は含める
      const objective = entities.objectives.get(objectiveId)
      if (objective) {
        return candidates.push(objective)
      }
    }
    return candidates
  }
)

// Objective 並び替えが可能かどうか
// - 選択ユーザー = ログインユーザー = Objective 責任者 => true
// - その他 => false
// ※ 選択ユーザーと Objective 一覧の更新タイミングのずれを吸収するために用いる
export const canMoveObjective = createSelector(
  state => state.current.get('userId'),
  state => state.loginUser.get('id'),
  state => state.objectives.get('ids'),
  state => state.entities,
  (currentUserId, loginUserId, objectiveIds, entities) => {
    if (currentUserId === loginUserId) {
      const objective = entities.objectives.get(objectiveIds.first())
      if (objective) {
        const objectiveOwnerId = objective.get('owner').get('id')
        return currentUserId === objectiveOwnerId
      }
    }
    return false
  }
)
