import { createActions } from "redux-actions";
import actionTypes from "../constants/actionTypes";

const actions = createActions({
  [actionTypes.ADD_SLACK_INTEGRATION]: code => ({ code }),
  [actionTypes.ADDED_SLACK_INTEGRATION]: () => {},
  [actionTypes.REMOVE_SLACK_INTEGRATION]: () => {},
  [actionTypes.REMOVED_SLACK_INTEGRATION]: () => {},
  [actionTypes.UPDATE_SLACK_INTEGRATION_STATUS]: enabled => ({ enabled }),
});

export default actions;
