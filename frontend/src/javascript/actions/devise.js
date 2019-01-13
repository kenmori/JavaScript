import { createActions } from "redux-actions";
import actionTypes from "../constants/actionTypes";

const actions = createActions({
  [actionTypes.SIGN_IN]: (user, location) => ({ user, location }),
  [actionTypes.SIGN_OUT]: () => {},
  [actionTypes.RESET_PASSWORD]: user => ({ user }),
  [actionTypes.RESET_PASSWORD_COMPLETED]: () => {},
  [actionTypes.SET_PASSWORD]: user => ({ user }),
});

export default actions;
