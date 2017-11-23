import { createActions } from 'redux-actions';
import actionTypes from '../constants/actionTypes';

const actions = createActions({
  [actionTypes.OPEN_KEY_RESULT_FORM_MODAL]: (objective) => ({ objective }),
  [actionTypes.CLOSE_KEY_RESULT_FORM_MODAL]: () => {},
  [actionTypes.OPEN_OBJECTIVE_FORM_MODAL]: (parentObjective, relatedKeyResult) => (
    { parentObjective: parentObjective, relatedKeyResult }
  ),
  [actionTypes.CLOSE_OBJECTIVE_FORM_MODAL]: () => {},
  [actionTypes.OPEN_OBJECTIVE_DETAIL_MODAL]: (objectiveId) => ({objectiveId}),
  [actionTypes.CLOSE_OBJECTIVE_DETAIL_MODAL]: () => {},
  [actionTypes.OPEN_AVATAR_IMAGE_MODAL]: (imageData) => ({imageData}),
  [actionTypes.CLOSE_AVATAR_IMAGE_MODAL]: () => {},
});

export default actions;
