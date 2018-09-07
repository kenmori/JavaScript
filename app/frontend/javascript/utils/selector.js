import { createSelector } from 'reselect'
import moment from 'moment/moment'
import {
  denormalizeObjective,
  denormalizeDeepObjective,
  denormalizeObjectives,
  denormalizeKeyResults,
  denormalizeObjectiveCandidates,
  denormalizeKeyResultCandidates
} from '../schemas'
import {
  isChildObjective,
  isObjectiveKeyResult,
  isMemberKeyResult
} from './okr'

export const getEnabledUsers = createSelector(
  state => state.users,
  users => users.filter(user => !user.get('disabled'))
)

const getUsersForSetting = createSelector(
  state => state.users,
  state => state.organization.get('ownerId'),
  (users, ownerId) =>
    users.map((user, index) =>
      user
        .set('index', index + 1)
        .set('isOwner', user.get('id') === ownerId)
        .set(
          'searchText',
          `${user.get('firstName')} ${user.get('lastName')} ${user.get(
            'email'
          )}`.toLowerCase()
        )
        .update(
          'signInAt',
          signInAt =>
            signInAt ? moment(signInAt).format('YYYY/M/D H:mm') : 'なし'
        )
    )
)

export const getEnabledUsersForSetting = createSelector(
  getUsersForSetting,
  users => users.filter(user => !user.get('disabled'))
)

export const getDisabledUsersForSetting = createSelector(
  getUsersForSetting,
  users => users.filter(user => user.get('disabled'))
)

export const getObjectives = createSelector(
  state => state.objectives.get('ids'),
  state => state.loginUser.getIn(['userSetting', 'showDisabledOkrs']),
  state => state.entities,
  (objectiveIds, showDisabledOkrs, entities) =>
    denormalizeObjectives(objectiveIds, showDisabledOkrs, entities)
)

export const getKeyResults = createSelector(
  state => state.keyResults.get('ids'),
  state => state.loginUser.getIn(['userSetting', 'showDisabledOkrs']),
  state => state.entities,
  (keyResultIds, showDisabledOkrs, entities) =>
    denormalizeKeyResults(keyResultIds, showDisabledOkrs, entities)
)

export const getMyObjectives = createSelector(
  getObjectives,
  state => state.entities,
  state => state.current.get('userIdAtFetchedObjectives'),
  state => state.loginUser.getIn(['userSetting', 'showChildObjectives']),
  (objectives, entities, ownerId, showChildObjectives) => {
    return showChildObjectives
      ? objectives
      : objectives.filterNot(objective =>
        isChildObjective(objective, ownerId, entities)
      )
  }
)

export const getMyKeyResults = createSelector(
  getKeyResults,
  state => state.current.get('userIdAtFetchedKeyResults'),
  state => state.loginUser.getIn(['userSetting', 'showObjectiveKeyResults']),
  state => state.loginUser.getIn(['userSetting', 'showMemberKeyResults']),
  (keyResults, ownerId, showObjectiveKeyResults, showMemberKeyResults) => {
    keyResults = showObjectiveKeyResults
      ? keyResults
      : keyResults.filterNot(keyResult =>
        isObjectiveKeyResult(keyResult, ownerId)
      )
    keyResults = showMemberKeyResults
      ? keyResults
      : keyResults.filterNot(keyResult => isMemberKeyResult(keyResult, ownerId))
    return keyResults
  }
)

export const getPreviousObjectives = createSelector(
  state => state.objectives.get('previousIds'),
  state => state.loginUser.getIn(['userSetting', 'showDisabledOkrs']),
  state => state.entities,
  (objectiveIds, showDisabledOkrs, entities) =>
    denormalizeObjectives(objectiveIds, showDisabledOkrs, entities)
)

// 孤立 (親のいない) Objective 一覧を返す
export const getIsolatedObjectives = createSelector(getObjectives, objectives =>
  objectives.filter(objective => !objective.get('parentKeyResultId'))
)

// Objective 作成モーダルに表示する上位 KR 一覧を返す
export const getParentKeyResults = createSelector(
  getKeyResults,
  state => state.dialogs.getIn(['objectiveForm', 'parentKeyResult']),
  (keyResults, parentKeyResult) => {
    const parentKeyResultId = parentKeyResult && parentKeyResult.get('id')
    if (
      parentKeyResultId &&
      !keyResults.find(keyResult => keyResult.get('id') === parentKeyResultId)
    ) {
      // 上位 KR 一覧に指定された上位 KR が存在しない場合は一覧に含める
      return keyResults.push(parentKeyResult)
    }
    return keyResults
  }
)

export const getTaskKeyResults = createSelector(
  state => state.keyResults.get('taskIds'),
  state => state.loginUser.getIn(['userSetting', 'showDisabledOkrs']),
  state => state.entities,
  (keyResultIds, showDisabledOkrs, entities) =>
    denormalizeKeyResults(keyResultIds, showDisabledOkrs, entities)
)

export const getMapObjective = createSelector(
  state =>
    state.current
      .get('mapOkr')
      .keySeq()
      .first(),
  state => state.loginUser.getIn(['userSetting', 'showDisabledOkrs']),
  state => state.entities,
  (objectiveId, showDisabledOkrs, entities) =>
    denormalizeDeepObjective(objectiveId, showDisabledOkrs, entities)
)

export const getOkrModalObjective = createSelector(
  state => state.dialogs.getIn(['okrForm', 'objectiveId']),
  state => state.dialogs.getIn(['okrForm', 'keyResultId']),
  state => state.dialogs.getIn(['okrForm', 'removedKeyResultId']),
  state => state.loginUser.getIn(['userSetting', 'showDisabledOkrs']),
  state => state.entities,
  (
    modalObjectiveId,
    modalKeyResultId,
    removedKeyResultId,
    showDisabledOkrs,
    entities
  ) => {
    const objectiveId =
      modalKeyResultId && modalKeyResultId !== removedKeyResultId
        ? entities.keyResults.getIn([modalKeyResultId, 'objectiveId']) // KR に紐付く Objective を指定する
        : modalObjectiveId
    return (
      objectiveId &&
      denormalizeObjective(objectiveId, showDisabledOkrs, entities)
    )
  }
)

// OKR 編集モーダルに表示する上位 KR 候補一覧を返す
export const getParentKeyResultCandidates = createSelector(
  getOkrModalObjective,
  state => state.keyResults.get('candidateIds'),
  state => state.loginUser.getIn(['userSetting', 'showDisabledOkrs']),
  state => state.entities,
  state => state.candidates,
  (modalObjective, keyResultIds, showDisabledOkrs, entities, candidates) => {
    const keyResults = denormalizeKeyResultCandidates(
      keyResultIds,
      showDisabledOkrs,
      candidates
    )
    const parentKeyResultId =
      modalObjective && modalObjective.get('parentKeyResultId')
    if (
      parentKeyResultId &&
      !keyResults.find(keyResult => keyResult.get('id') === parentKeyResultId)
    ) {
      // 候補一覧に指定された上位 KR が存在しない場合は一覧に含める
      const parentKeyResult = entities.keyResults.get(parentKeyResultId)
      if (parentKeyResult) {
        return keyResults.push(parentKeyResult)
      }
    }
    return keyResults
  }
)

// OKR 編集モーダルに表示する Objective 候補一覧を返す
// - 管理者 => 全 O
// - O 責任者 => 自分の O のみ
// - その他 => 他人の O のみ
export const getObjectiveCandidates = createSelector(
  getOkrModalObjective,
  state => state.objectives.get('candidateIds'),
  state => state.loginUser.getIn(['userSetting', 'showDisabledOkrs']),
  state => state.entities,
  state => state.candidates,
  (modalObjective, objectiveIds, showDisabledOkrs, entities, candidates) => {
    const objectives = denormalizeObjectiveCandidates(
      objectiveIds,
      showDisabledOkrs,
      candidates
    )
    const objectiveId = modalObjective && modalObjective.get('id')
    if (
      objectiveId &&
      !objectives.find(objective => objective.get('id') === objectiveId)
    ) {
      // 候補一覧に指定された Objective が存在しない場合は一覧に含める
      const objective = entities.objectives.get(objectiveId)
      if (objective) {
        return objectives.push(objective)
      }
    }
    return objectives
  }
)
