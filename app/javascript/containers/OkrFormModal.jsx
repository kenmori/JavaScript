import OkrFormModal from '../components/OkrFormModal';
import { connect } from 'react-redux';
import objectiveActions from '../actions/objectives';
import keyResultActions from '../actions/keyResults';
import dialogActions from '../actions/dialogs';
import { denormalizeObjective } from '../schemas/index'

const mapStateToProps = (state) => {
  let objective = state.entities.objectives.get(state.dialogs.getIn(['okrForm', 'objectiveId']));
  return {
    isOpen: state.dialogs.getIn(['okrForm', 'isOpen']),
    objective: objective && denormalizeObjective(objective, state.entities),
    selectedOkr: state.dialogs.getIn(['okrForm', 'selectedOkr']),
    users: state.users,
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
      dispatch(objectiveActions.updateObjective(objective));
    },
    updateKeyResult: (keyResult) => {
      dispatch(keyResultActions.updateKeyResult(keyResult));
    },
    closeModal: () => {
      dispatch(dialogActions.closeOkrFormModal());
    },
    removeKeyResult: (keyResult) => {
      dispatch(keyResultActions.removeKeyResult(keyResult));
    },
    removeObjective: (id) => {
      dispatch(objectiveActions.removeObjective(id));
    },
    showOkrDetail: (okrType, targetId) => {
      dispatch(dialogActions.showOkrDetail({ okrType, targetId }));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OkrFormModal);
