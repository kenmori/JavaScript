import { fromJS } from "immutable";
import { handleActions } from "redux-actions";
import ActionTypes from "../constants/actionTypes";

const initialState = fromJS({
  isOpened: false,
  isForceCloseLoading: false,
});

export default handleActions(
  {
    [ActionTypes.OPEN_LOADING]: state => state.set("isOpened", true),
    [ActionTypes.CLOSE_LOADING]: state => state.set("isOpened", false),
    [ActionTypes.FORCE_CLOSE_LOADING_ON]: state =>
      state.set("isForceCloseLoading", true),
    [ActionTypes.FORCE_CLOSE_LOADING_OFF]: state =>
      state.set("isForceCloseLoading", false),
  },
  initialState,
);
