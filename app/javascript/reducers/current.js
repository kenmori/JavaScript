import { fromJS, OrderedMap, Set } from 'immutable'
import { handleActions } from 'redux-actions'
import ActionTypes from '../constants/actionTypes'
import gon from '../utils/gon'
import { OkrTypes } from '../utils/okr'

const initialState = fromJS({
  okrPeriodId: gon.getIn(['okrPeriod', 'id']),
  userId: gon.getIn(['loginUser', 'id']),
  userIdAtFetchedObjectives: gon.getIn(['loginUser', 'id']),
  userIdAtFetchedKeyResults: gon.getIn(['loginUser', 'id']),
  userIdAtFetchedTaskKeyResults: gon.getIn(['loginUser', 'id']),
  selectedTab: OkrTypes.TASK,
  highlightedOkr: { objectiveIds: [], keyResultId: null },
  selectedOkr: { objectiveId: null, keyResultId: null },
  mapOkr: {}, // OrderedMap<ObjectiveId, Set<KeyResultId>>
  scrollToObjectiveId: null,
})

const getSwitchedVisibleIds = (mapOkr, objectiveId, keyResultIds, parentKeyResultId) => {
  // 表示系統を切り替えるため親の ID を検索する
  const index = mapOkr.valueSeq().findIndex(ids => ids.includes(parentKeyResultId))
  return mapOkr.take(index + 1).set(objectiveId, keyResultIds)
}

export default handleActions({
  [ActionTypes.SELECTED_OKR_PERIOD]: (state, { payload }) => (
    state.set('okrPeriodId', payload.okrPeriodId)
  ),
  [ActionTypes.SELECTED_USER]: (state, { payload }) => (
    state.set('userId', payload.userId)
  ),
  [ActionTypes.FETCHED_OBJECTIVES]: state => {
    return state.set('userIdAtFetchedObjectives', state.get('userId'))
      .set('userIdAtFetchedTaskKeyResults', state.get('userId')) // タスク KR の fetch 省略を考慮
  },
  [ActionTypes.FETCHED_KEY_RESULTS]: state => {
    return state.set('userIdAtFetchedKeyResults', state.get('userId'))
  },
  [ActionTypes.FETCHED_TASK_KEY_RESULTS]: state => {
    return state.set('userIdAtFetchedTaskKeyResults', state.get('userId'))
  },
  [ActionTypes.SELECT_TAB]: (state, { payload }) => {
    return state.set('selectedTab', payload.type)
  },
  [ActionTypes.HIGHLIGHT_OKR]: (state, { payload }) => {
    const { objectiveIds, keyResultId } = payload
    return state.mergeIn(['highlightedOkr'], { objectiveIds, keyResultId })
  },
  [ActionTypes.UNHIGHLIGHT_OKR]: state => {
    return state.mergeIn(['highlightedOkr'], { objectiveIds: fromJS([]), keyResultId: null })
  },
  [ActionTypes.SELECT_OKR]: (state, { payload }) => {
    const { objectiveId, keyResultId } = payload
    return state.mergeIn(['selectedOkr'], { objectiveId, keyResultId })
  },
  [ActionTypes.CLEAR_SELECTED_OKR]: state => {
    return state.mergeIn(['selectedOkr'], { objectiveId: null, keyResultId: null })
  },
  [ActionTypes.SELECTED_MAP_OKR]: (state, { payload }) => {
    const { objectiveId, keyResultIds, parentKeyResultId } = payload
    const isMapped = state.get('mapOkr').some((krIds, oId) => oId === objectiveId || krIds.includes(parentKeyResultId))
    return isMapped ? state // 既にマップ上に展開されている場合はマップ OKR を切り替えない
      : state.set('mapOkr', OrderedMap([[objectiveId, keyResultIds.toSet()]]))
  },
  [ActionTypes.CLEAR_MAP_OKR]: state => {
    return state.set('mapOkr', OrderedMap())
  },
  [ActionTypes.EXPANDED_OBJECTIVE]: (state, { payload }) => {
    const { objectiveId, keyResultIds, parentKeyResultId, toAncestor } = payload
    const mapOkr = state.get('mapOkr')
    const newMapOkr = toAncestor
      ? OrderedMap([[objectiveId, keyResultIds.toSet()]]).merge(mapOkr)
      : getSwitchedVisibleIds(mapOkr, objectiveId, keyResultIds.toSet(), parentKeyResultId)
    return state.set('mapOkr', newMapOkr)
  },
  [ActionTypes.COLLAPSE_OBJECTIVE]: (state, { payload }) => {
    const { objectiveId, toAncestor } = payload
    const mapOkr = state.get('mapOkr')
    const index = mapOkr.keySeq().findIndex(id => id === objectiveId)
    const newMapOkr = toAncestor
      ? mapOkr.skip(index + 1)
      : mapOkr.take(index).set(objectiveId, Set())
    return state.set('mapOkr', newMapOkr)
  },
  [ActionTypes.EXPANDED_KEY_RESULT]: (state, { payload }) => {
    const { objectiveId, keyResultId, parentKeyResultId } = payload
    const mapOkr = state.get('mapOkr')
    const newMapOkr = mapOkr.has(objectiveId)
      ? mapOkr.update(objectiveId, keyResultIds => keyResultIds.add(keyResultId))
      // 最初の KR を展開した場合は Objective も展開する
      : getSwitchedVisibleIds(mapOkr, objectiveId, Set.of(keyResultId), parentKeyResultId)
    return state.set('mapOkr', newMapOkr)
  },
  [ActionTypes.COLLAPSE_KEY_RESULT]: (state, { payload }) => {
    const { objectiveId, keyResultId, childObjectiveIds } = payload
    const mapOkr = state.get('mapOkr')
    let newMapOkr = mapOkr.update(objectiveId, keyResultIds => keyResultIds.delete(keyResultId))
    const index = newMapOkr.keySeq().findIndex(id => childObjectiveIds.includes(id))
    if (index > 0) {
      newMapOkr = newMapOkr.take(index) // KR に紐付く下位 Objective も展開されている場合は折り畳む
    }
    return state.set('mapOkr', newMapOkr)
  },
  [ActionTypes.ADDED_OBJECTIVE]: (state, { payload }) => {
    const objectiveId = payload.get('result').first()
    return state.mergeIn(['selectedOkr'], { objectiveId, keyResultId: null })
  },
  [ActionTypes.REMOVED_OBJECTIVE]: (state, { payload }) => {
    const objectiveId = payload.get('result').first()
    const isSelected = state.getIn(['selectedOkr', 'objectiveId']) === objectiveId
    return isSelected ? state.mergeIn(['selectedOkr'], { objectiveId: null, keyResultId: null }) : state
  },
  [ActionTypes.SCROLL_TO_OBJECTIVE]: (state, { payload }) => {
    // 選択中 O の再選択時にも props 変更イベントを飛ばすため String オブジェクト (別インスタンス) にする
    // noinspection JSPrimitiveTypeWrapperUsage
    return state.set('scrollToObjectiveId', new String(payload.objectiveId))
  },
}, initialState)
