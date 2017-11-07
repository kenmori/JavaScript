import { fromJS, Map } from 'immutable';
import { handleActions } from 'redux-actions';
import ActionTypes from '../constants/actionTypes';

export default handleActions({
    [ActionTypes.OPEN_OBJECTIVE_FORM_MODAL]: (state, { payload }) => (
      state.set('objectiveForm', fromJS({ isOpen: true, objective: payload.objective }))
    ),
    [ActionTypes.CLOSE_OBJECTIVE_FORM_MODAL]: (state) => (
      state.set('objectiveForm', fromJS({ isOpen: false, objective: Map() }))
    ),
    [ActionTypes.OPEN_KEY_RESULT_FORM_MODAL]: (state, { payload }) => (
      state.set('keyResultForm', fromJS({ isOpen: true, objective: payload.objective }))
    ),
    [ActionTypes.CLOSE_KEY_RESULT_FORM_MODAL]: (state) => (
      state.set('keyResultForm', fromJS({ isOpen: false, objective: Map() }))
    ),
    [ActionTypes.OPEN_OBJECTIVE_DETAIL_MODAL]: (state, { payload }) => (
      state.set('objectiveDetail', fromJS({ isOpen: true, objectiveId: payload.objectiveId }))
    ),
    [ActionTypes.CLOSE_OBJECTIVE_DETAIL_MODAL]: (state) => (
      state.set('objectiveDetail', fromJS({ isOpen: false, objectiveId: null }))
    ),
    [ActionTypes.OPEN_AVATAR_IMAGE_MODAL]: (state, { payload }) => (
      state.set('avatarImage', fromJS({ isOpen: true, imageData: payload.imageData }))
    ),
    [ActionTypes.CLOSE_AVATAR_IMAGE_MODAL]: (state) => (
      state.set('avatarImage', fromJS({ isOpen: false, imageData: null }))
    ),
  },
  fromJS({
    objectiveForm: {
      isOpen: false,
      objective: Map(),
    },
    keyResultForm: {
      isOpen: false,
      objective: Map(),
    },
    objectiveDetail: {
      isOpen: false,
      objectiveId: null,
    },
    avatarImage: {
      isOpen: false,
      imageData: '',
    },
  }),
);
