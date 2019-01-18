import { fromJS } from "immutable";
import { handleActions } from "redux-actions";
import ActionTypes from "../constants/actionTypes";

const initialState = fromJS({
  ids: [],
  previousIds: [],
  candidateIds: [],
  isFetchedObjective: true,
  isFetchedObjectives: false,
  isFetchedPreviousObjectives: true,
  isFetchedCandidates: false,
  histories: [],
});

function add(state, objectiveId) {
  return state.update("ids", ids =>
    ids.includes(objectiveId) ? ids : ids.insert(0, objectiveId),
  );
}

function remove(state, objectiveId) {
  return state.update("ids", ids => ids.filter(id => id !== objectiveId));
}

function addToCandidates(state, objectiveId) {
  return state.update("candidateIds", ids => ids.insert(0, objectiveId));
}

function removeFromCandidates(state, objectiveId) {
  return state.update("candidateIds", ids =>
    ids.filter(id => id !== objectiveId),
  );
}

function isMine(objectiveId, payload) {
  const userId = payload.get("currentUserId");
  const objective = payload.getIn(["entities", "objectives", `${objectiveId}`]);
  return userId === objective.getIn(["owner", "id"]);
}

export default handleActions(
  {
    [ActionTypes.FETCH_OBJECTIVE]: state =>
      state.set("isFetchedObjective", false),
    [ActionTypes.FETCHED_OBJECTIVE]: state =>
      state.set("isFetchedObjective", true),
    [ActionTypes.FETCH_OBJECTIVES]: state =>
      state.set("isFetchedObjectives", false),
    [ActionTypes.FETCHED_OBJECTIVES]: (state, { payload }) => {
      const objectiveIds = payload.get("result");
      return state.set("ids", objectiveIds).set("isFetchedObjectives", true);
    },
    [ActionTypes.FETCH_PREVIOUS_OBJECTIVES]: state =>
      state.set("isFetchedPreviousObjectives", false),
    [ActionTypes.FETCHED_PREVIOUS_OBJECTIVES]: (state, { payload }) => {
      const objectiveIds = payload.get("result");
      return state
        .set("previousIds", objectiveIds)
        .set("isFetchedPreviousObjectives", true);
    },
    [ActionTypes.FETCHED_PREVIOUS_OBJECTIVES_ERROR]: state =>
      state
        .update("previousIds", ids => ids.clear())
        .set("isFetchedPreviousObjectives", true),
    [ActionTypes.FETCH_OBJECTIVE_CANDIDATES]: state =>
      state.set("isFetchedCandidates", false),
    [ActionTypes.FETCHED_OBJECTIVE_CANDIDATES]: (state, { payload }) =>
      state
        .set("candidateIds", payload.get("result"))
        .set("isFetchedCandidates", true),
    [ActionTypes.ADDED_OBJECTIVE]: (state, { payload }) => {
      const objectiveId = payload.get("result").first();
      state = addToCandidates(state, objectiveId);
      return isMine(objectiveId, payload) ? add(state, objectiveId) : state;
    },
    [ActionTypes.UPDATED_OBJECTIVE]: (state, { payload }) => {
      const objectiveId = payload.get("result").first();
      return isMine(objectiveId, payload)
        ? add(state, objectiveId)
        : remove(state, objectiveId);
    },
    [ActionTypes.REMOVED_OBJECTIVE]: (state, { payload }) => {
      const objectiveId = payload.get("result").first();
      state = removeFromCandidates(state, objectiveId);
      return remove(state, objectiveId);
    },
    [ActionTypes.UPDATED_OBJECTIVE_ORDER]: (state, { payload }) => {
      if (!payload.order) return state;
      const objectiveOrder = JSON.parse(payload.order);
      return state.update("ids", ids =>
        ids.sortBy(id => objectiveOrder.indexOf(id)),
      );
    },
  },
  initialState,
);
