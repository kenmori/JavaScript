import DashBoard from '../components/DashBoard';
import { connect } from 'react-redux';
import objectiveActions from '../actions/objectives';


const mapStateToProps = (state) => {
  return {
    loginUser: state.loginUser,
    okrPeriod: state.okrPeriod,
    objectives: state.objectives
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchObjectives: (args) => {
      dispatch(objectiveActions.fetchObjectives(args));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashBoard);
