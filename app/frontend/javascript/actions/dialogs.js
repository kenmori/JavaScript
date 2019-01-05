import { createActions } from "redux-actions";
import actionTypes from "../constants/actionTypes";

const actions = createActions({
  [actionTypes.OPEN_KEY_RESULT_MODAL]: objective => ({ objective }),
  [actionTypes.CLOSE_KEY_RESULT_MODAL]: () => {},
  [actionTypes.OPEN_OBJECTIVE_MODAL]: parentKeyResult => ({ parentKeyResult }),
  [actionTypes.CLOSE_OBJECTIVE_MODAL]: () => {},
  [actionTypes.OPEN_OKR_MODAL]: (objectiveId, keyResultId) => ({
    objectiveId,
    keyResultId,
  }),
  [actionTypes.OPENED_OKR_MODAL]: (objectiveId, keyResultId) => ({
    objectiveId,
    keyResultId,
  }),
  [actionTypes.CLOSE_OKR_MODAL]: () => {},
  [actionTypes.OPEN_IMAGE_MODAL]: (id, data, type = "avatar") => ({
    id,
    data,
    type,
  }),
  [actionTypes.CLOSE_IMAGE_MODAL]: () => {},
  [actionTypes.OPEN_ERROR_MODAL]: params => ({ params }),
  [actionTypes.CLOSE_ERROR_MODAL]: () => {},
  [actionTypes.OPEN_CONFIRM_MODAL]: params => ({ params }),
  [actionTypes.CLOSE_CONFIRM_MODAL]: () => {},
  [actionTypes.OPEN_OPTION_MODAL]: () => {},
  [actionTypes.CLOSE_OPTION_MODAL]: () => {},
  [actionTypes.OPEN_COMMENT_MODAL]: commentLabel => ({ commentLabel }),
  [actionTypes.CLOSE_COMMENT_MODAL]: () => {},
  [actionTypes.OPEN_OBJECTIVE_COMMENT_MODAL]: commentLabel => ({
    commentLabel,
  }),
  [actionTypes.CLOSE_OBJECTIVE_COMMENT_MODAL]: () => {},
});

export default actions;
