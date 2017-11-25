import ObjectiveDetailModal from '../components/ObjectiveDetailModal';
import { connect } from 'react-redux';
import objectiveActions from '../actions/objectives';
import keyResultActions from '../actions/keyResults';
import dialogActions from '../actions/dialogs';

const mapStateToProps = (state) => {
  return {
    isOpen: state.dialogs.getIn(['objectiveDetail', 'isOpen']),
    objective: state.objectives.find((objective) => { return objective.get('id') == state.dialogs.getIn(['objectiveDetail', 'objectiveId'])}),
    users: state.users,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateObjective: (objective) => {
      dispatch(objectiveActions.updateObjective(objective));
    },
    updateKeyResult: (keyResult) => {
      dispatch(keyResultActions.updateKeyResult(keyResult));
    },
    closeModal: () => {
      dispatch(dialogActions.closeObjectiveDetailModal());
    },
    removeKeyResult: (keyResult) => {
      dispatch(keyResultActions.removeKeyResult(keyResult));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ObjectiveDetailModal);
