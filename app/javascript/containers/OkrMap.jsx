import OkrMap from '../components/map/OkrMap';
import { connect } from 'react-redux';
import objectiveActions from '../actions/objectives';
import dialogActions from '../actions/dialogs'
import { getSelectedObjective } from '../utils/selector'

const mapStateToProps = state => {
  return {
    objective: getSelectedObjective(state),
    isFetchedObjectives: state.objectives.get('isFetchedObjectives'),
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchObjective: objectiveId => {
      dispatch(objectiveActions.fetchObjective(objectiveId));
    },
    fetchObjectiveByKeyResult: keyResultId => {
      dispatch(objectiveActions.fetchObjective(null, keyResultId));
    },
    openObjectiveModal: () => {
      dispatch(dialogActions.openObjectiveModal())
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OkrMap);
