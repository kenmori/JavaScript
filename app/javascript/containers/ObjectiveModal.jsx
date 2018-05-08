import ObjectiveModal from '../components/objectivemodal/ObjectiveModal';
import { connect } from 'react-redux';
import objectiveActions from '../actions/objectives';
import dialogActions from '../actions/dialogs';
import { getKeyResults, getPreviousObjectives, getIsolatedObjectives, getEnabledUsers } from '../utils/selector'

const mapStateToProps = (state) => {
  const parentKeyResult = state.dialogs.getIn(['objectiveForm', 'parentKeyResult']);
  return {
    isOpen: state.dialogs.getIn(['objectiveForm', 'isOpen']),
    parentKeyResult,
    currentUserId: state.current.get('userId'),
    users: getEnabledUsers(state),
    okrPeriodId: state.current.get('okrPeriodId'),
    parentKeyResults: getKeyResults(state),
    isFetchedKeyResults: state.keyResults.get('isFetchedKeyResults'),
    objectives: getIsolatedObjectives(state),
    isFetchedObjectives: state.objectives.get('isFetchedObjectives'),
    previousObjectives: getPreviousObjectives(state),
    isFetchedPreviousObjectives: state.objectives.get('isFetchedPreviousObjectives'),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addObjective: (objective, viaHome, isCopy) => {
      dispatch(objectiveActions.addObjective(objective, viaHome, isCopy))
    },
    updateObjective: objective => {
      dispatch(objectiveActions.updateObjective(objective));
    },
    closeModal: () => {
      dispatch(dialogActions.closeObjectiveModal());
    },
    confirm: params => {
      dispatch(dialogActions.openConfirmModal(params));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ObjectiveModal);
