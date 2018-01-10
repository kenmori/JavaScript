import { fromJS, Map } from 'immutable';
import { handleActions } from 'redux-actions';
import ActionTypes from '../constants/actionTypes';

export default handleActions({
    [ActionTypes.OPEN_OBJECTIVE_FORM_MODAL]: (state, { payload }) => (
      state.set('objectiveForm', fromJS({
        isOpen: true,
        parentObjective: payload.parentObjective,
        relatedKeyResult: payload.relatedKeyResult,
      }))
    ),
    [ActionTypes.CLOSE_OBJECTIVE_FORM_MODAL]: (state) => (
      state.set('objectiveForm', fromJS({ isOpen: false }))
    ),
    [ActionTypes.OPEN_KEY_RESULT_FORM_MODAL]: (state, { payload }) => (
      state.set('keyResultForm', fromJS({ isOpen: true, objective: payload.objective }))
    ),
    [ActionTypes.CLOSE_KEY_RESULT_FORM_MODAL]: (state) => (
      state.set('keyResultForm', fromJS({ isOpen: false }))
    ),
    [ActionTypes.OPEN_OKR_FORM_MODAL]: (state, { payload }) => (
      state.set('okrForm', fromJS({ isOpen: true, objectiveId: payload.objectiveId, selectedOkr: payload.selectedOkr }))
    ),
    [ActionTypes.CLOSE_OKR_FORM_MODAL]: (state) => (
      state.set('okrForm', fromJS({ isOpen: false, objectiveId: null, selectedOkr: null }))
    ),
    [ActionTypes.SHOW_OKR_DETAIL]: (state, { payload }) => (
      state.set('okrForm', state.get('okrForm').set('selectedOkr', fromJS(payload.selectedOkr)))
    ),
    [ActionTypes.OPEN_AVATAR_IMAGE_MODAL]: (state, { payload }) => (
      state.set('avatarImage', fromJS({ isOpen: true, imageData: payload.imageData, targetId: payload.targetId }))
    ),
    [ActionTypes.CLOSE_AVATAR_IMAGE_MODAL]: (state) => (
      state.set('avatarImage', fromJS({ isOpen: false, imageData: null, targetId: null }))
    ),
    [ActionTypes.UPDATED_AVATAR]: (state, { payload }) => (
      state.set('avatarImage', fromJS({ isOpen: false, imageData: null }))
    ),
    [ActionTypes.OPEN_LOGO_IMAGE_MODAL]: (state, { payload }) => (
      state.set('logoImage', fromJS({ isOpen: true, imageData: payload.imageData, targetId: payload.targetId }))
    ),
    [ActionTypes.CLOSE_LOGO_IMAGE_MODAL]: (state) => (
      state.set('logoImage', fromJS({ isOpen: false, imageData: null, targetId: null }))
    ),
    [ActionTypes.UPDATED_LOGO]: (state, { payload }) => (
      state.set('logoImage', fromJS({ isOpen: false, imageData: null }))
    ),
    [ActionTypes.OPEN_ERROR_MODAL]: (state, { payload }) => (
      state.set('error', fromJS({ isOpen: true, message: payload.message }))
    ),
    [ActionTypes.CLOSE_ERROR_MODAL]: (state) => (
      state.set('error', fromJS({ isOpen: false, message: ''}))
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
    okrForm: {
      isOpen: false,
      objectiveId: null,
      selectedOkr: Map(),
    },
    avatarImage: {
      isOpen: false,
      imageData: '',
    },
    logoImage: {
      isOpen: false,
      imageData: '',
    },
    error: {
      isOpen: false,
      message: '',
    }
  }),
);
