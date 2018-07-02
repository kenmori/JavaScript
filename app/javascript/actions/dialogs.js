import { createActions } from 'redux-actions';
import actionTypes from '../constants/actionTypes';

const actions = createActions({
  [actionTypes.OPEN_KEY_RESULT_MODAL]: (objective) => ({ objective }),
  [actionTypes.CLOSE_KEY_RESULT_MODAL]: () => {},
  [actionTypes.OPEN_OBJECTIVE_MODAL]: parentKeyResult => ({ parentKeyResult }),
  [actionTypes.CLOSE_OBJECTIVE_MODAL]: () => {},
  [actionTypes.OPEN_OKR_MODAL]: (objectiveId, keyResultId) => ({ objectiveId, keyResultId }),
  [actionTypes.OPENED_OKR_MODAL]: (objectiveId, keyResultId) => ({ objectiveId, keyResultId }),
  [actionTypes.CLOSE_OKR_MODAL]: () => {},
  [actionTypes.OPEN_AVATAR_MODAL]: (targetId, imageData) => ({ targetId, imageData }),
  [actionTypes.CLOSE_AVATAR_MODAL]: () => {},
  [actionTypes.OPEN_LOGO_MODAL]: (targetId, imageData) => ({ targetId, imageData }),
  [actionTypes.CLOSE_LOGO_MODAL]: () => {},
  [actionTypes.OPEN_ERROR_MODAL]: params => ({ params }),
  [actionTypes.CLOSE_ERROR_MODAL]: () => {},
  [actionTypes.OPEN_CONFIRM_MODAL]: params => ({ params }),
  [actionTypes.CLOSE_CONFIRM_MODAL]: () => {},
  [actionTypes.OPEN_OPTION_MODAL]: () => {},
  [actionTypes.CLOSE_OPTION_MODAL]: () => {},
});

export default actions;
