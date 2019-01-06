import { fromJS } from "immutable";
import { handleActions } from "redux-actions";
import ActionTypes from "../constants/actionTypes";

export default handleActions(
  {
    [ActionTypes.FETCHED_ORGANIZATION]: (state, { payload }) =>
      state.merge(payload.organization.get("okrPeriods")),
    [ActionTypes.ADDED_OKR_PERIOD]: (state, { payload }) =>
      state.push(payload.okrPeriod),
    [ActionTypes.UPDATED_OKR_PERIOD]: (state, { payload }) => {
      const okrPeriodId = payload.okrPeriod.get("id");
      return state.set(
        state.findIndex(okrPeriod => okrPeriod.get("id") === okrPeriodId),
        payload.okrPeriod,
      );
    },
    [ActionTypes.REMOVED_OKR_PERIOD]: (state, { payload }) =>
      state.filter(okrPeriod => okrPeriod.get("id") !== payload.okrPeriod.id),
  },
  fromJS([]),
);
