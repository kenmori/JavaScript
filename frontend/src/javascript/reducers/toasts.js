import { fromJS } from "immutable";
import { handleActions } from "redux-actions";
import ActionTypes from "../constants/actionTypes";

const initialState = fromJS({
  message: null,
  type: null,
});

export default handleActions(
  {
    [ActionTypes.SHOW_TOAST]: (state, { payload }) =>
      state
        .set("message", new String(payload.message))
        .set("type", payload.type),
    [ActionTypes.CLEAR_TOAST]: state =>
      state.set("message", null).set("type", null),
  },
  initialState,
);
