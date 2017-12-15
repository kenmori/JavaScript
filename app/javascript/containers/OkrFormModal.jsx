import OkrFormModal from '../components/OkrFormModal';
import { connect } from 'react-redux';
import objectiveActions from '../actions/objectives';
import keyResultActions from '../actions/keyResults';
import dialogActions from '../actions/dialogs';

const mapStateToProps = (state) => {
  function findObjective(objectives, id) {
    let objective = undefined;
    objectives.forEach(item => {
      if (item.get('id') === id) {
        objective = item;
        return false;
      }
      if (item.get('childObjectives')) {
        objective = findObjective(item.get('childObjectives'), id);
        if (objective) {
          return false;
        }
      }
    });
    return objective;
  }

  return {
    isOpen: state.dialogs.getIn(['okrForm', 'isOpen']),
    objective: findObjective(state.objectives, state.dialogs.getIn(['okrForm', 'objectiveId'])),
    selectedOkr: state.dialogs.getIn(['okrForm', 'selectedOkr']),
    users: state.users,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openObjectiveFormModal: (parentObjective, relatedKeyResult) => {
      dispatch(dialogActions.openObjectiveFormModal(parentObjective, relatedKeyResult));
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