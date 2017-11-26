import Dashboard from '../components/Dashboard';
import { connect } from 'react-redux';
import objectiveActions from '../actions/objectives';
import dialogActions from '../actions/dialogs';

const mapStateToProps = (state) => {
  return {
    menu: state.menu,
    objectives: state.objectives
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchObjectives: (okrPeriodId, userId) => {
      dispatch(objectiveActions.fetchObjectives(okrPeriodId, userId));
    },
    openObjectiveFormModal: () => {
      dispatch(dialogActions.openObjectiveFormModal());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);
