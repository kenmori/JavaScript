import { createActions } from 'redux-actions';
import actionTypes from '../constants/actionTypes';

const actions = createActions({
  [actionTypes.OPEN_KEY_RESULT_MODAL]: (objective) => ({ objective }),
  [actionTypes.CLOSE_KEY_RESULT_MODAL]: () => {},
  [actionTypes.OPEN_OBJECTIVE_MODAL]: parentKeyResult => ({ parentKeyResult }),
  [actionTypes.CLOSE_OBJECTIVE_MODAL]: () => {},
  [actionTypes.OPEN_OKR_MODAL]: (objectiveId, selectedOkr) => ({ objectiveId, selectedOkr }),
  [actionTypes.CLOSE_OKR_MODAL]: () => {},
  [actionTypes.OPEN_AVATAR_MODAL]: (targetId, imageData) => ({ targetId, imageData }),
  [actionTypes.CLOSE_AVATAR_MODAL]: () => {},
  [actionTypes.SHOW_OKR_PANE]: (selectedOkr) => ({selectedOkr}),
  [actionTypes.OPEN_LOGO_MODAL]: (targetId, imageData) => ({ targetId, imageData }),
  [actionTypes.CLOSE_LOGO_MODAL]: () => {},
  [actionTypes.OPEN_ERROR_MODAL]: (message) => ({message}),
  [actionTypes.CLOSE_ERROR_MODAL]: () => {},
});

export default actions;
