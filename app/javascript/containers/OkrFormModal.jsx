import OkrFormModal from '../components/OkrFormModal';
import { connect } from 'react-redux';
import objectiveActions from '../actions/objectives';
import keyResultActions from '../actions/keyResults';
import dialogActions from '../actions/dialogs';
import { denormalizeObjective } from '../schemas/index'

const mapStateToProps = (state) => {
  this.currentUserId = state.current.get('userId');
  let objective = state.entities.objectives.get(state.dialogs.getIn(['okrForm', 'objectiveId']));
  return {
    isOpen: state.dialogs.getIn(['okrForm', 'isOpen']),
    objective: objective && denormalizeObjective(objective, state.entities),
    selectedOkr: state.dialogs.getIn(['okrForm', 'selectedOkr']),
    users: state.users,
    message: state.dialogs.getIn(['okrForm', 'message']),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openObjectiveFormModal: (parentObjective, relatedKeyResult) => {
      dispatch(dialogActions.openObjectiveFormModal(parentObjective, relatedKeyResult));
    },
    openKeyResultFormModal: (objective) => {
      dispatch(dialogActions.openKeyResultFormModal(objective));
    },
    updateObjective: (objective) => {
      dispatch(objectiveActions.updateObjective(objective, this.currentUserId));
    },
    updateKeyResult: (keyResult) => {
      dispatch(keyResultActions.updateKeyResult(keyResult, this.currentUserId));
    },
    closeModal: () => {
      dispatch(dialogActions.closeOkrFormModal());
    },
    removeKeyResult: (id) => {
      dispatch(keyResultActions.removeKeyResult(id));
    },
    removeObjective: (id) => {
      dispatch(objectiveActions.removeObjective(id));
    },
    showOkrDetail: (okrType, targetId) => {
      if (okrType === 'objective') {
        dispatch(dialogActions.showOkrDetail({ okrType }));
      } else {
        dispatch(dialogActions.showOkrDetail({ okrType, targetId: -1 }));
        setTimeout(() => {
          dispatch(dialogActions.showOkrDetail({ okrType, targetId }));
        }, 0);
      }
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OkrFormModal);
