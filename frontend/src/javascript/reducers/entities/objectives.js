import { Map } from "immutable";
import { handleActions } from "redux-actions";
import ActionTypes from "../../constants/actionTypes";

function merge(state, { payload }) {
  const objectives = payload.getIn(["entities", "objectives"]);
  if (!objectives) return state;
  return state.mergeWith(
    (oldVal, newVal) => oldVal.merge(newVal),
    objectives
      .filter(
        objective => objective.get("isFull") || state.has(objective.get("id")),
      )
      .mapKeys(key => parseInt(key)), // normalize により id が string になるため int へ変換する
  );
}

function resetParentKeyResult(
  state,
  removedKeyResultId,
  removedMemberId = null,
) {
  // 上位 KR = 削除した KR な下位 O がある場合は上位 KR を null にリセットする (孤立 O になる)
  const childObjectives = state.filter(objective => {
    // 上位 KR が削除されたか (関係者削除時は、さらに上位 KR 関係者 = 下位 O 責任者か)
    const isRemoved = objective.get("parentKeyResultId") === removedKeyResultId;
    return (
      isRemoved &&
      (removedMemberId
        ? objective.getIn(["owner", "id"]) === removedMemberId
        : true)
    );
  });
  return childObjectives.isEmpty()
    ? state
    : state.merge(
        childObjectives.map(objective =>
          objective.set("parentKeyResultId", null),
        ),
      );
}

export default handleActions(
  {
    [ActionTypes.FETCHED_OBJECTIVE]: merge,
    [ActionTypes.FETCHED_OBJECTIVES]: merge,
    [ActionTypes.FETCHED_PREVIOUS_OBJECTIVES]: merge,
    [ActionTypes.ADDED_OBJECTIVE]: merge,
    [ActionTypes.UPDATED_OBJECTIVE]: merge,
    [ActionTypes.REMOVED_OBJECTIVE]: (state, { payload }) => {
      state = merge(state, { payload });
      const objectiveId = payload.get("result").first();
      return state.delete(objectiveId);
    },
    [ActionTypes.DISABLED_OBJECTIVE]: merge,
    [ActionTypes.ADDED_KEY_RESULT]: merge,
    [ActionTypes.UPDATED_KEY_RESULT]: merge,
    [ActionTypes.REMOVED_KEY_RESULT]: (state, { payload }) => {
      state = merge(state, { payload });
      const keyResultId = payload.get("result").first();
      return resetParentKeyResult(state, keyResultId);
    },
    [ActionTypes.REMOVED_KEY_RESULT_MEMBER]: (state, { payload }) => {
      const { keyResultId, removedMemberId } = payload;
      return resetParentKeyResult(state, keyResultId, removedMemberId);
    },
    [ActionTypes.REMOVED_OBJECTIVE_KEY_RESULTS]: (state, { payload }) => {
      const { keyResultIds } = payload;
      keyResultIds.forEach(
        keyResultId => (state = resetParentKeyResult(state, keyResultId)),
      );
      return state;
    },
    [ActionTypes.DISABLED_KEY_RESULT]: merge,
    [ActionTypes.FETCHED_OBJECTIVE_HISTORY]: (state, { payload }) =>
      state.set(
        payload.id,
        state.get(payload.id).set("histories", payload.histories),
      ),
  },
  Map(),
);
