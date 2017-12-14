import { createActions } from 'redux-actions';
import actionTypes from '../constants/actionTypes';

const actions = createActions({
  [actionTypes.OPEN_KEY_RESULT_FORM_MODAL]: (objective) => ({ objective }),
  [actionTypes.CLOSE_KEY_RESULT_FORM_MODAL]: () => {},
  [actionTypes.OPEN_OBJECTIVE_FORM_MODAL]: (parentObjective, relatedKeyResult) => ({
    parentObjective,
    relatedKeyResult
  }),
  [actionTypes.CLOSE_OBJECTIVE_FORM_MODAL]: () => {},
  [actionTypes.OPEN_OKR_FORM_MODAL]: (objectiveId, selectedOkr) => ({ objectiveId, selectedOkr }),
  [actionTypes.CLOSE_OKR_FORM_MODAL]: () => {},
  [actionTypes.OPEN_AVATAR_IMAGE_MODAL]: (targetId, imageData) => ({ targetId, imageData }),
  [actionTypes.CLOSE_AVATAR_IMAGE_MODAL]: () => {},
  [actionTypes.SHOW_OKR_DETAIL]: (selectedOkr) => ({selectedOkr}),
});

export default actions;
