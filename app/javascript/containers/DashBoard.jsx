import DashBoard from '../components/DashBoard';
import { connect } from 'react-redux';
import objectiveActions from '../actions/objectives';
import dialogActions from '../actions/dialogs';

const mapStateToProps = (state) => {
  return {
    loginUser: state.loginUser,
    menu: state.menu,
    objectives: state.objectives
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchObjectives: (args) => {
      dispatch(objectiveActions.fetchObjectives(args));
    },
    openObjectiveFormModal: () => {
      dispatch(dialogActions.openObjectiveFormModal());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashBoard);
