import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import ActionTypes from '../constants/actionTypes';

export default handleActions({
    [ActionTypes.OPEN_OBJECTIVE_FORM_MODAL]: (state) => (
      state.setIn(['objectiveForm', 'isOpen'], true)
    ),
    [ActionTypes.CLOSE_OBJECTIVE_FORM_MODAL]: (state) => (
      state.setIn(['objectiveForm', 'isOpen'], false)
    ),
    [ActionTypes.OPEN_KEY_RESULT_FORM_MODAL]: (state, { payload }) => (
      state.set('keyResultForm', fromJS({ isOpen: true, objective: payload.objective }))
    ),
    [ActionTypes.CLOSE_KEY_RESULT_FORM_MODAL]: (state) => (
      state.set('keyResultForm', fromJS({ isOpen: false, objective: null }))
    )
  },
  fromJS({
    objectiveForm: {
      isOpen: false
    },
    keyResultForm: {
      isOpen: false,
      objective: null
    }
  })
);
