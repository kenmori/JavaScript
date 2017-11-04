import ObjectiveForm from '../components/ObjectiveForm';
import { connect } from 'react-redux';
import objectiveActions from '../actions/objectives';

const mapStateToProps = (_state) => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    addObjective: (objective, isOpenKeyResultFormModal = false) => {
      dispatch(objectiveActions.addObjective(objective, isOpenKeyResultFormModal));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ObjectiveForm);
