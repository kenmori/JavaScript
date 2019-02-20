import { fromJS } from "immutable";
import { handleActions } from "redux-actions";
import ActionTypes from "../constants/actionTypes";

const initialState = fromJS({
  slackEnabled: false,
});

export default handleActions(
  {
    [ActionTypes.ADD_SLACK_INTEGRATION]: state => state,
    [ActionTypes.ADDED_SLACK_INTEGRATION]: state =>
      state.set("slackEnabled", true),
    [ActionTypes.REMOVE_SLACK_INTEGRATION]: state => state,
    [ActionTypes.REMOVED_SLACK_INTEGRATION]: state =>
      state.set("slackEnabled", false),
    [ActionTypes.UPDATE_SLACK_INTEGRATION_STATUS]: (state, { payload }) =>
      state.set("slackEnabled", payload.enabled),
  },
  initialState,
);
