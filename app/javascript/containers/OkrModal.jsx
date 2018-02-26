import OkrModal from '../components/okrmodal/OkrModal';
import { fromJS } from 'immutable';
import { connect } from 'react-redux';
import objectiveActions from '../actions/objectives';
import keyResultActions from '../actions/keyResults';
import dialogActions from '../actions/dialogs';
import confirmActions from '../actions/confirm';
import { denormalizeObjective, denormalizeKeyResults } from '../schemas/index'

const mapStateToProps = (state) => {
  this.currentUserId = state.current.get('userId');
  const objectiveId = state.dialogs.getIn(['okrForm', 'objectiveId']);
  return {
    isOpen: state.dialogs.getIn(['okrForm', 'isOpen']),
    objective: objectiveId ? denormalizeObjective(objectiveId, state.entities) : null,
    selectedOkr: state.dialogs.getIn(['okrForm', 'selectedOkr']),
    users: state.users.filter(user => !user.get('disabled')),
    loginUser: state.loginUser,
    keyResults: denormalizeKeyResults(state.keyResults.get('allIds'), state.entities)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openObjectiveModal: (parentObjective, relatedKeyResult) => {
      dispatch(dialogActions.openObjectiveModal(parentObjective, relatedKeyResult));
    },
    openKeyResultModal: (objective) => {
      dispatch(dialogActions.openKeyResultModal(objective));
    },
    updateObjective: (objective, oldParentObjectiveId = null, oldParentKeyResultId = null) => {
      const args = { currentUserId: this.currentUserId, oldParentObjectiveId, oldParentKeyResultId };
      dispatch(objectiveActions.updateObjective(objective, args));
    },
    updateKeyResult: (keyResult) => {
      dispatch(keyResultActions.updateKeyResult(keyResult, this.currentUserId));
    },
    closeModal: () => {
      dispatch(dialogActions.closeOkrModal());
    },
    removeKeyResult: (id) => {
      dispatch(keyResultActions.removeKeyResult(id));
    },
    removeObjective: (id) => {
      dispatch(objectiveActions.removeObjective(id));
    },
    confirm: (conformParams) => {
      dispatch(confirmActions.openConfirm(conformParams));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OkrModal);
