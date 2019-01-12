import { fromJS } from "immutable";
import { handleActions } from "redux-actions";
import ActionTypes from "../constants/actionTypes";

const initialState = fromJS({
  current: {},
  ownerId: 0,
  isFetched: false,
  isCompleted: false,
});

function merge(state, { payload }) {
  return state.update("current", current =>
    current.merge(payload.organization),
  );
}

export default handleActions(
  {
    [ActionTypes.FETCH_ORGANIZATION]: state => state.set("isFetched", false),
    [ActionTypes.FETCHED_ORGANIZATION]: (state, { payload }) =>
      merge(state, { payload }).set("isFetched", true),
    [ActionTypes.ADDED_ORGANIZATION]: state => state.set("isCompleted", true),
    [ActionTypes.UPDATED_ORGANIZATION]: merge,
    [ActionTypes.UPDATED_ORGANIZATION_OWNER]: (state, { payload }) =>
      state.set("ownerId", payload.ownerId),
    [ActionTypes.SET_CURRENT_ORGANIZATION]: (state, { payload }) =>
      state
        .set("current", payload.organization)
        .set("ownerId", payload.organization.get("owner").get("id")),
  },
  initialState,
);
