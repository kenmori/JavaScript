import { fromJS, Map } from 'immutable';
import { handleActions } from 'redux-actions';
import ActionTypes from '../constants/actionTypes';

export default handleActions({
    [ActionTypes.OPEN_OBJECTIVE_MODAL]: (state, { payload }) => (
      state.set('objectiveForm', fromJS({ isOpen: true, parentKeyResult: payload.parentKeyResult }))
    ),
    [ActionTypes.CLOSE_OBJECTIVE_MODAL]: (state) => (
      state.set('objectiveForm', fromJS({ isOpen: false }))
    ),
    [ActionTypes.OPEN_KEY_RESULT_MODAL]: (state, { payload }) => (
      state.set('keyResultForm', fromJS({ isOpen: true, objective: payload.objective }))
    ),
    [ActionTypes.CLOSE_KEY_RESULT_MODAL]: (state) => (
      state.set('keyResultForm', fromJS({ isOpen: false }))
    ),
    [ActionTypes.OPENED_OKR_MODAL]: (state, { payload }) => (
      state.set('okrForm', fromJS({ isOpen: true, objectiveId: payload.objectiveId, keyResultId: payload.keyResultId }))
    ),
    [ActionTypes.CLOSE_OKR_MODAL]: (state) => (
      state.set('okrForm', fromJS({ isOpen: false, objectiveId: null, keyResultId: null }))
    ),
    [ActionTypes.REMOVED_OBJECTIVE]: (state, { payload }) => {
      const objectiveId = payload.get('result').first();
      return state.setIn(['okrForm', 'removedObjectiveId'], objectiveId);
    },
    [ActionTypes.REMOVED_KEY_RESULT]: (state, { payload }) => {
      const keyResultId = payload.get('result').first();
      return state.setIn(['okrForm', 'removedKeyResultId'], keyResultId);
    },
    [ActionTypes.OPEN_AVATAR_MODAL]: (state, { payload }) => (
      state.set('avatarImage', fromJS({ isOpen: true, imageData: payload.imageData, targetId: payload.targetId }))
    ),
    [ActionTypes.CLOSE_AVATAR_MODAL]: (state) => (
      state.set('avatarImage', fromJS({ isOpen: false, imageData: null, targetId: null }))
    ),
    [ActionTypes.UPDATED_AVATAR]: (state, { payload }) => (
      state.set('avatarImage', fromJS({ isOpen: false, imageData: null }))
    ),
    [ActionTypes.OPEN_LOGO_MODAL]: (state, { payload }) => (
      state.set('logoImage', fromJS({ isOpen: true, imageData: payload.imageData, targetId: payload.targetId }))
    ),
    [ActionTypes.CLOSE_LOGO_MODAL]: (state) => (
      state.set('logoImage', fromJS({ isOpen: false, imageData: null, targetId: null }))
    ),
    [ActionTypes.UPDATED_LOGO]: (state, { payload }) => (
      state.set('logoImage', fromJS({ isOpen: false, imageData: null }))
    ),
    [ActionTypes.OPEN_ERROR_MODAL]: (state, { payload }) => (
      state.set('error', fromJS(payload.params).merge({ isOpen: true }))
    ),
    [ActionTypes.CLOSE_ERROR_MODAL]: (state) => (
      state.setIn(['error', 'isOpen'], false)
    ),
    [ActionTypes.OPEN_CONFIRM_MODAL]: (state, { payload }) => {
      return state.set('confirm', fromJS(payload.params).merge({ isOpen: true }));
    },
    [ActionTypes.CLOSE_CONFIRM_MODAL]: (state) => {
      return state.setIn(['confirm', 'isOpen'], false);
    },
    [ActionTypes.OPEN_OPTION_MODAL]: state => {
      return state.setIn(['option', 'isOpen'], true)
    },
    [ActionTypes.CLOSE_OPTION_MODAL]: state => {
      return state.setIn(['option', 'isOpen'], false)
    },
  },
  fromJS({
    objectiveForm: {
      isOpen: false,
    },
    keyResultForm: {
      isOpen: false,
      objective: Map(),
    },
    okrForm: {
      isOpen: false,
      objectiveId: null,
      keyResultId: null,
    },
    avatarImage: {
      isOpen: false,
      imageData: null,
    },
    logoImage: {
      isOpen: false,
      imageData: null,
    },
    error: {
      isOpen: false,
    },
    confirm: {
      isOpen: false,
    },
    option: {
      isOpen:false,
    }
  }),
);
